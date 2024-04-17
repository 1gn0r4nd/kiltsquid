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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cTypeUpdated = exports.cTypeCreated = void 0;
const support_1 = require("../support");
const v2800 = __importStar(require("../v2800"));
const v10890 = __importStar(require("../v10890"));
exports.cTypeCreated = {
    name: 'Ctype.CTypeCreated',
    /**
     * A new CType has been created.
     * \[creator identifier, CType hash\]
     */
    v2800: new support_1.EventType('Ctype.CTypeCreated', support_1.sts.tuple([v2800.AccountId32, v2800.H256])),
};
exports.cTypeUpdated = {
    name: 'Ctype.CTypeUpdated',
    /**
     * Information about a CType has been updated.
     * \[CType hash\]
     */
    v10890: new support_1.EventType('Ctype.CTypeUpdated', v10890.H256),
};
