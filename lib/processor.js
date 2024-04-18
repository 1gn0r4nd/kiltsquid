"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processor = void 0;
const substrate_processor_1 = require("@subsquid/substrate-processor");
const archive_registry_1 = require("@subsquid/archive-registry");
const types_1 = require("./types");
exports.processor = new substrate_processor_1.SubstrateBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/substrate-indexing/supported-networks/
    .setGateway((0, archive_registry_1.lookupArchive)('kilt', { release: 'ArrowSquid' }))
    // Chain RPC endpoint is required on Substrate for metadata and real-time updates
    .setRpcEndpoint({
    // set RPC endpoint in .env
    url: process.env.RPC_KILT_WSS,
    rateLimit: 10
})
    .addEvent({
    name: [
        types_1.events.balances.transfer.name
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
});
