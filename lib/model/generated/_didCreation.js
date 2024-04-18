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
exports.DIDCreation = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
const _extrinsic_1 = require("./_extrinsic");
class DIDCreation {
    constructor(props, json) {
        Object.assign(this, props);
        if (json != null) {
            this._id = marshal.id.fromJSON(json.id);
            this._did = marshal.string.fromJSON(json.did);
            this._submitter = marshal.string.fromJSON(json.submitter);
            this._owner = marshal.string.fromJSON(json.owner);
            this._publicKey = marshal.string.fromJSON(json.publicKey);
            this._blockNumber = marshal.int.fromJSON(json.blockNumber);
            this._extrinsic = new _extrinsic_1.Extrinsic(undefined, marshal.nonNull(json.extrinsic));
            this._timestamp = marshal.datetime.fromJSON(json.timestamp);
        }
    }
    get id() {
        (0, assert_1.default)(this._id != null, 'uninitialized access');
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get did() {
        (0, assert_1.default)(this._did != null, 'uninitialized access');
        return this._did;
    }
    set did(value) {
        this._did = value;
    }
    get submitter() {
        (0, assert_1.default)(this._submitter != null, 'uninitialized access');
        return this._submitter;
    }
    set submitter(value) {
        this._submitter = value;
    }
    get owner() {
        (0, assert_1.default)(this._owner != null, 'uninitialized access');
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get publicKey() {
        (0, assert_1.default)(this._publicKey != null, 'uninitialized access');
        return this._publicKey;
    }
    set publicKey(value) {
        this._publicKey = value;
    }
    get blockNumber() {
        (0, assert_1.default)(this._blockNumber != null, 'uninitialized access');
        return this._blockNumber;
    }
    set blockNumber(value) {
        this._blockNumber = value;
    }
    get extrinsic() {
        (0, assert_1.default)(this._extrinsic != null, 'uninitialized access');
        return this._extrinsic;
    }
    set extrinsic(value) {
        this._extrinsic = value;
    }
    get timestamp() {
        (0, assert_1.default)(this._timestamp != null, 'uninitialized access');
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    toJSON() {
        return {
            id: this.id,
            did: this.did,
            submitter: this.submitter,
            owner: this.owner,
            publicKey: this.publicKey,
            blockNumber: this.blockNumber,
            extrinsic: this.extrinsic.toJSON(),
            timestamp: marshal.datetime.toJSON(this.timestamp),
        };
    }
}
exports.DIDCreation = DIDCreation;
