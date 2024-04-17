"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const substrate_processor_1 = require("@subsquid/substrate-processor");
const typeorm_store_1 = require("@subsquid/typeorm-store");
const archive_registry_1 = require("@subsquid/archive-registry");
const processor = new substrate_processor_1.SubstrateBatchProcessor()
    .setGateway((0, archive_registry_1.lookupArchive)('kilt'))
    .setRpcEndpoint({
    // set RPC endpoint in .env
    url: process.env.RPC_KILT_WSS,
    rateLimit: 10
});
// .setFinalityConfirmation(75) // 15 mins to finality
// .addLog({
//   address: [ '0xdAC17F958D2ee523a2206206994597C13D831ec7' ],
//   topic0: [ usdtAbi.events.Transfer.topic ]
// })
const db = new typeorm_store_1.TypeormDatabase();
processor.run(db, async (ctx) => {
    const transfers = [];
    for (let block of ctx.blocks) {
        console.log(block);
        // for (let log of block.logs) {
        //   console.log(log)
        // let {from, to, value} = usdtAbi.events.Transfer.decode(log)
        // transfers.push(new Transfer({
        //   id: log.id,
        //   from, to, value
        // }))
        // }
    }
    await ctx.store.insert(transfers);
});
