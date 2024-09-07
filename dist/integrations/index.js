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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PAGE_AGE = void 0;
exports.processIntegration = processIntegration;
const bugs_1 = __importDefault(require("./bugs"));
const tasks_1 = __importDefault(require("./tasks"));
const cache_1 = require("../cache");
exports.MAX_PAGE_AGE = 45; // in minutes
const MAX_PAGE_COUNT = 20;
function processIntegration(notion, databaseId, webhookUrl, integration) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = (yield notion.databases.query({
            database_id: databaseId,
            page_size: MAX_PAGE_COUNT,
        })).results;
        const lastPageId = (0, cache_1.getLastPageId)(integration);
        let currentPageId = "";
        if (integration === "bugs") {
            currentPageId = yield (0, bugs_1.default)(response, webhookUrl, lastPageId);
        }
        else if (integration == "tasks") {
            currentPageId = yield (0, tasks_1.default)(response, webhookUrl, lastPageId);
        }
        if (currentPageId) {
            (0, cache_1.setCurrentPageId)(integration, currentPageId);
        }
    });
}
