"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountId = exports.Balance = void 0;
const support_1 = require("./support");
exports.Balance = support_1.sts.bigint();
exports.AccountId = support_1.sts.bytes();
