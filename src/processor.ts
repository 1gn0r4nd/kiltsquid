import {assertNotNull} from '@subsquid/util-internal'
import {
  BlockHeader,
  DataHandlerContext,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Event as _Event,
  Call as _Call,
  Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'
import { lookupArchive } from '@subsquid/archive-registry'
import {events} from './types'


export const processor = new SubstrateBatchProcessor()
  // Lookup archive by the network name in Subsquid registry
  // See https://docs.subsquid.io/substrate-indexing/supported-networks/
  .setGateway(lookupArchive('kilt', {release: 'ArrowSquid'}))
  // Chain RPC endpoint is required on Substrate for metadata and real-time updates
  .setRpcEndpoint({
    // set RPC endpoint in .env
    url: process.env.RPC_KILT_WSS,
    rateLimit: 10
  })
  .addEvent({
    name: [
      events.balances.transfer.name
    ],
    call: true,
    extrinsic: true
  })
  .setFields({
    extrinsic: {
      hash: true,
      fee: true
    },
    block: {
      timestamp: true
    },
    event: {
      args: true
    },
  })
// Uncomment to disable RPC ingestion and drastically reduce no of RPC calls
//.useArchiveOnly()

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>