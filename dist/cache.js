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
exports.loadCache = loadCache;
exports.saveCache = saveCache;
exports.getLastPageId = getLastPageId;
exports.setCurrentPageId = setCurrentPageId;
const cache_1 = require("@actions/cache");
const fs_1 = require("fs");
const PATHS = ["bugs.txt", "tasks.txt"];
const CACHE_KEY = "last-pages";
function loadCache() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.GITHUB_ACTIONS) {
            return;
        }
        yield (0, cache_1.restoreCache)(PATHS, `${CACHE_KEY}-${Number(process.env.GITHUB_RUN_NUMBER) - 1}`, [`${CACHE_KEY}-`]);
        PATHS.forEach((path) => {
            if (!(0, fs_1.existsSync)(path)) {
                (0, fs_1.writeFileSync)(path, "");
            }
        });
    });
}
function saveCache() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.GITHUB_ACTIONS) {
            return;
        }
        yield (0, cache_1.saveCache)(PATHS, `${CACHE_KEY}-${process.env.GITHUB_RUN_NUMBER}`);
    });
}
function getLastPageId(integration) {
    const path = PATHS[integration === "bugs" ? 0 : 1];
    if ((0, fs_1.existsSync)(path)) {
        return (0, fs_1.readFileSync)(path, "utf-8");
    }
    else {
        return "";
    }
}
function setCurrentPageId(integration, pageId) {
    (0, fs_1.writeFileSync)(PATHS[integration === "bugs" ? 0 : 1], pageId);
}
