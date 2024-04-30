import {
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  DataHandlerContext
} from '@subsquid/substrate-processor'
import {In} from 'typeorm'
import * as ss58 from '@subsquid/ss58'
import {TypeormDatabase, Store} from '@subsquid/typeorm-store'
import assert from 'assert'
// import * as usdtAbi from './abi/usdt'
import {processor, ProcessorContext} from './processor'
import {Block, Extrinsic, Account, Transfer, Call} from './model'
import {events} from './types'

const db = new TypeormDatabase({supportHotBlocks: true})

processor.run(db, async (ctx) => {
  //Store blocks
  //ctx = of type :DataHandlerContext
  // await test(ctx);
  // let blocks: Block[] = createBlocks(ctx);
  // await ctx.store.insert(blocks)
  await createAndStoreBlocks(ctx);
  //Store extrinsics
  await createAndStoreExtrinsics(ctx);

  // transfer events
  let transferEvents: TransferEvent[] = getTransferEvents(ctx)

  let accounts: Map<string, Account> = await createAccounts(ctx, transferEvents)
  let transfers: Transfer[] = createTransfers(transferEvents, accounts)

  await ctx.store.upsert([...accounts.values()])
  await ctx.store.insert(transfers)

})
async function createAndStoreBlocks(ctx: ProcessorContext<Store>){
  let blocks: Block[] = []
  for (let block of ctx.blocks) {
    blocks.push(new Block(
      {
        id: block.header.height.toString(),
        hash: block.header.hash,
        // @ts-ignore
        timestamp: new Date(block.header.timestamp),
      })
    );
  }
  await ctx.store.insert(blocks)
}

//https://docs.subsquid.io/sdk/reference/processors/substrate-batch/field-selection/#extrinsics
async function createAndStoreExtrinsics(ctx: ProcessorContext<Store>){
  for (let block of ctx.blocks) {
    for (let extrinsic of block.extrinsics) {
      const blocks = await ctx.store.findBy(Block, { id: block.header.height.toString() });
      const b = blocks[0]; // Get the first block from the results
      if (!b) {
        throw new Error(`Block not found for height: ${block.header.height}`);
      }
      let calls: Call[] = []
      let e = new Extrinsic(
        {
          id: `${b.id}-${extrinsic.index}`,
          block: b,
          index: extrinsic.index,
          // @ts-ignore
          hash: extrinsic.hash,
          // @ts-ignore
          timestamp: new Date(block.header.timestamp),
          // @ts-ignore
          fee: extrinsic.fee || 0n,
          // @ts-ignore
          tip: extrinsic.tip || 0n,
          // signature
        });
      await ctx.store.insert([e]);
      const extc = await ctx.store.findBy(Extrinsic, { id: `${b.id}-${extrinsic.index}` });
      if(extrinsic.call){
        ctx.log.info(extrinsic.call, `Call:`);
        calls.push(new Call(
          {
            id: `${b.id}-${extrinsic.index}-${extrinsic.call.id}`,
            name: extrinsic.call.name,
            args: extrinsic.call.args,
            extrinsic: extc[0],
            block: b
          })
        );
      } else {
        for (let call of extrinsic.subcalls) {
          ctx.log.info(call, `Subcall - call:`);
          calls.push(new Call(
            {
              id: `${b.id}-${extrinsic.index}-${call.id}`,
              name: call.name,
              args: call.args,
              extrinsic: extc[0],
              block: b
            })
          );
        }
      }
      ctx.store.insert(calls);
    }
  }
}
async function test(ctx: ProcessorContext<Store>){
  for (let block of ctx.blocks) {
    // for (let event of block.events) {
    //   // filter and process events
    // }
    for (let call of block.calls) {
      ctx.log.info("#########");
      // @ts-ignore
      ctx.log.info(call, `Call:`);
      await new Promise(r => setTimeout(r, 2000));
    }
    // for (let extrinsic of block.extrinsics) {
    //   // ctx.log.info("#########");
    //   // // @ts-ignore
    //   // ctx.log.info(extrinsic.call?.name, `Extrinsic:`);
    //   // await new Promise(r => setTimeout(r, 2000));
    // }
  }
}

interface TransferEvent {
  id: string
  blockNumber: number
  timestamp: Date
  extrinsicHash?: string
  from: string
  to: string
  amount: bigint
  fee: bigint
}

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
  // Filters and decodes the arriving events
  let transfers: TransferEvent[] = []
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name == events.balances.transfer.name) {
        let rec: {from: string; to: string; amount: bigint}
        if (events.balances.transfer.v21.is(event)) {
          let [from, to, amount] = events.balances.transfer.v21.decode(event)
          rec = {from, to, amount}
        }
        else if (events.balances.transfer.v10400.is(event)) {
          let {from, to, amount} = events.balances.transfer.v10400.decode(event)
          rec = {from, to, amount}
        }
        // else if (events.balances.transfer.v9130.is(event)) {
        //   rec = events.balances.transfer.v9130.decode(event)
        // }
        else {
          throw new Error('Unsupported spec')
        }
        // @ts-ignore
        assert(block.header.timestamp, `Got an undefined timestamp at block ${block.header.height}`)
        transfers.push({
          id: event.id,
          blockNumber: block.header.height,
          // @ts-ignore
          timestamp: new Date(block.header.timestamp),
          // @ts-ignore
          extrinsicHash: event.extrinsic?.hash,
          from: ss58.codec('kilt').encode(rec.from),
          to: ss58.codec('kilt').encode(rec.to),
          amount: rec.amount,
          // @ts-ignore
          fee: event.extrinsic?.fee || 0n,
        })
      }
    }
  }
  return transfers
}

async function createAccounts(ctx: ProcessorContext<Store>, transferEvents: TransferEvent[]): Promise<Map<string,Account>> {
  const accountIds = new Set<string>()
  for (let t of transferEvents) {
    accountIds.add(t.from)
    accountIds.add(t.to)
  }

  const accounts = await ctx.store.findBy(Account, {id: In([...accountIds])}).then((accounts) => {
    return new Map(accounts.map((a) => [a.id, a]))
  })

  for (let t of transferEvents) {
    updateAccounts(t.from)
    updateAccounts(t.to)
  }

  function updateAccounts(id: string): void {
    const acc = accounts.get(id)
    if (acc == null) {
      accounts.set(id, new Account({id}))
    }
  }

  return accounts
}

function createTransfers(transferEvents: TransferEvent[], accounts: Map<string, Account>): Transfer[] {
  let transfers: Transfer[] = []
  for (let t of transferEvents) {
    let {id, blockNumber, timestamp, extrinsicHash, amount, fee} = t
    let from = accounts.get(t.from)
    let to = accounts.get(t.to)
    transfers.push(new Transfer({
      id,
      blockNumber,
      timestamp,
      // extrinsicHash,
      from,
      to,
      amount,
      // fee,
    }))
  }
  return transfers
}

