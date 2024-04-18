"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ss58 = __importStar(require("@subsquid/ss58"));
const typeorm_store_1 = require("@subsquid/typeorm-store");
const assert_1 = __importDefault(require("assert"));
// import * as usdtAbi from './abi/usdt'
const processor_1 = require("./processor");
const model_1 = require("./model");
const types_1 = require("./types");
const db = new typeorm_store_1.TypeormDatabase({ supportHotBlocks: true });
processor_1.processor.run(db, async (ctx) => {
    let transferEvents = getTransferEvents(ctx);
    let accounts = await createAccounts(ctx, transferEvents);
    let transfers = createTransfers(transferEvents, accounts);
    await ctx.store.upsert([...accounts.values()]);
    await ctx.store.insert(transfers);
});
function getTransferEvents(ctx) {
    // Filters and decodes the arriving events
    let transfers = [];
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == types_1.events.balances.transfer.name) {
                let rec;
                if (types_1.events.balances.transfer.v21.is(event)) {
                    let [from, to, amount] = types_1.events.balances.transfer.v21.decode(event);
                    rec = { from, to, amount };
                }
                else if (types_1.events.balances.transfer.v10400.is(event)) {
                    let { from, to, amount } = types_1.events.balances.transfer.v10400.decode(event);
                    rec = { from, to, amount };
                }
                // else if (events.balances.transfer.v9130.is(event)) {
                //   rec = events.balances.transfer.v9130.decode(event)
                // }
                else {
                    throw new Error('Unsupported spec');
                }
                // @ts-ignore
                (0, assert_1.default)(block.header.timestamp, `Got an undefined timestamp at block ${block.header.height}`);
                transfers.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    // @ts-ignore
                    timestamp: new Date(block.header.timestamp),
                    // extrinsicHash: event.extrinsic?.hash,
                    from: ss58.codec('kilt').encode(rec.from),
                    to: ss58.codec('kilt').encode(rec.to),
                    amount: rec.amount,
                    // fee: event.extrinsic?.fee || 0n,
                });
            }
        }
    }
    return transfers;
}
async function createAccounts(ctx, transferEvents) {
    const accountIds = new Set();
    for (let t of transferEvents) {
        accountIds.add(t.from);
        accountIds.add(t.to);
    }
    const accounts = await ctx.store.findBy(model_1.Account, { id: (0, typeorm_1.In)([...accountIds]) }).then((accounts) => {
        return new Map(accounts.map((a) => [a.id, a]));
    });
    for (let t of transferEvents) {
        updateAccounts(t.from);
        updateAccounts(t.to);
    }
    function updateAccounts(id) {
        const acc = accounts.get(id);
        if (acc == null) {
            accounts.set(id, new model_1.Account({ id }));
        }
    }
    return accounts;
}
function createTransfers(transferEvents, accounts) {
    let transfers = [];
    for (let t of transferEvents) {
        let { id, blockNumber, timestamp, extrinsicHash, amount, fee } = t;
        let from = accounts.get(t.from);
        let to = accounts.get(t.to);
        transfers.push(new model_1.Transfer({
            id,
            blockNumber,
            timestamp,
            // extrinsicHash,
            from,
            to,
            amount,
            // fee,
        }));
    }
    return transfers;
}
