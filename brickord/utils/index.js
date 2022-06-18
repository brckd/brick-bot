"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getFiles(dir, ext = /(.js|.ts)$/) {
    return fs_1.default.readdirSync(dir).filter(file => ext.test(file)).map(f => path_1.default.join(dir, f));
}
exports.getFiles = getFiles;
