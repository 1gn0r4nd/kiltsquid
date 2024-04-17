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
exports.StorageType = exports.ConstantType = exports.CallType = exports.EventType = exports.sts = void 0;
const sts = __importStar(require("@subsquid/substrate-runtime/lib/sts"));
exports.sts = sts;
const assert_1 = __importDefault(require("assert"));
class EventType {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    matches(block) {
        return block._runtime.events.checkType(this.name, this.type);
    }
    is(event) {
        return this.name == event.name && this.matches(event.block);
    }
    decode(event) {
        (0, assert_1.default)(this.is(event));
        return event.block._runtime.decodeJsonEventRecordArguments(event);
    }
}
exports.EventType = EventType;
class CallType {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    matches(block) {
        return block._runtime.calls.checkType(this.name, this.type);
    }
    is(call) {
        return this.name == call.name && this.matches(call.block);
    }
    decode(call) {
        (0, assert_1.default)(this.is(call));
        return call.block._runtime.decodeJsonCallRecordArguments(call);
    }
}
exports.CallType = CallType;
class ConstantType {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    is(block) {
        return block._runtime.checkConstantType(this.name, this.type);
    }
    get(block) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getConstant(this.name);
    }
}
exports.ConstantType = ConstantType;
class StorageType {
    constructor(name, modifier, key, value) {
        this.name = name;
        this.modifier = modifier;
        this.key = key;
        this.value = value;
    }
    is(block) {
        return block._runtime.checkStorageType(this.name, this.modifier, this.key, this.value);
    }
    async get(block, ...key) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStorage(block.hash, this.name, ...key);
    }
    async getAll(block) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.queryStorage(block.hash, this.name);
    }
    async getMany(block, keys) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.queryStorage(block.hash, this.name, keys);
    }
    async getKeys(block, ...args) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStorageKeys(block.hash, this.name, ...args);
    }
    async getRawKeys(block, ...args) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStorageRawKeys(block.hash, this.name, ...args);
    }
    getKeysPaged(pageSize, block, ...args) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStorageKeysPaged(pageSize, block.hash, this.name, ...args);
    }
    async getPairs(block, ...args) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStoragePairs(block.hash, this.name, ...args);
    }
    getPairsPaged(pageSize, block, ...args) {
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStoragePairsPaged(pageSize, block.hash, this.name, ...args);
    }
    getDefault(block) {
        (0, assert_1.default)(this.modifier == 'Default');
        (0, assert_1.default)(this.is(block));
        return block._runtime.getStorageFallback(this.name);
    }
}
exports.StorageType = StorageType;