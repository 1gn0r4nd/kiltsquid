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
exports.Extrinsic = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class Extrinsic {
    constructor(props, json) {
        Object.assign(this, props);
        if (json != null) {
            this._id = marshal.id.fromJSON(json.id);
            this._index = marshal.int.fromJSON(json.index);
            this._hash = marshal.string.fromJSON(json.hash);
            this._method = marshal.string.fromJSON(json.method);
            this._blockNumber = marshal.int.fromJSON(json.blockNumber);
        }
    }
    get id() {
        (0, assert_1.default)(this._id != null, 'uninitialized access');
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get index() {
        (0, assert_1.default)(this._index != null, 'uninitialized access');
        return this._index;
    }
    set index(value) {
        this._index = value;
    }
    get hash() {
        (0, assert_1.default)(this._hash != null, 'uninitialized access');
        return this._hash;
    }
    set hash(value) {
        this._hash = value;
    }
    get method() {
        (0, assert_1.default)(this._method != null, 'uninitialized access');
        return this._method;
    }
    set method(value) {
        this._method = value;
    }
    get blockNumber() {
        (0, assert_1.default)(this._blockNumber != null, 'uninitialized access');
        return this._blockNumber;
    }
    set blockNumber(value) {
        this._blockNumber = value;
    }
    toJSON() {
        return {
            id: this.id,
            index: this.index,
            hash: this.hash,
            method: this.method,
            blockNumber: this.blockNumber,
        };
    }
}
exports.Extrinsic = Extrinsic;
