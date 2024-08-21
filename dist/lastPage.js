"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCurrentPageId = saveCurrentPageId;
exports.loadLastPageId = loadLastPageId;
const cache_1 = require("@actions/cache");
const fs_1 = require("fs");
const PATHS = ["data.txt"];
const CACHE_KET = "lastPage";
function saveCurrentPageId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, fs_1.writeFileSync)(PATHS[0], id);
        if (process.env.GITHUB_ACTIONS) {
            yield (0, cache_1.saveCache)(PATHS, CACHE_KET);
        }
    });
}
function loadLastPageId() {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = process.env.GITHUB_ACTIONS
            ? yield (0, cache_1.restoreCache)(PATHS, CACHE_KET)
            : (0, fs_1.existsSync)(PATHS[0]);
        if (exists) {
            return (0, fs_1.readFileSync)(PATHS[0], "utf-8");
        }
        else {
            return "";
        }
    });
}
