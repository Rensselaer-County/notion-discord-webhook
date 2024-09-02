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
const client_1 = require("@notionhq/client");
const dotenv_1 = require("dotenv");
const getInputs_1 = __importDefault(require("./getInputs"));
const cache_1 = require("./cache");
const integrations_1 = require("./integrations");
const MAX_PAGE_AGE = 45; // in minutes
const MAX_PAGE_COUNT = 20;
if (!process.env.GITHUB_ACTIONS) {
    (0, dotenv_1.configDotenv)();
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { NOTION_API_KEY, BUGS_DATABASE_ID, TASKS_DATABASE_ID, BUGS_WEBHOOK_URL, TASKS_WEBHOOK_URL, } = (0, getInputs_1.default)();
    const notion = new client_1.Client({
        auth: NOTION_API_KEY,
    });
    yield (0, cache_1.loadCache)();
    (0, integrations_1.processIntegration)(notion, BUGS_DATABASE_ID, BUGS_WEBHOOK_URL, "bugs");
    (0, integrations_1.processIntegration)(notion, TASKS_DATABASE_ID, TASKS_WEBHOOK_URL, "tasks");
    yield (0, cache_1.saveCache)();
}))();
