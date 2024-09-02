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
exports.default = default_1;
const _1 = require(".");
const parseArrayProperty_1 = __importDefault(require("../parseArrayProperty"));
const sendMessage_1 = __importDefault(require("../sendMessage"));
function default_1(response, webhookUrl, lastPageId) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentPageId = "";
        for (const page of response) {
            const pageId = page.id;
            const createdTime = page.created_time;
            const timeElapsed = (new Date().getTime() - Date.parse(createdTime)) / 1000 / 60;
            if (pageId == lastPageId || timeElapsed > _1.MAX_PAGE_AGE) {
                console.log("No new bugs found");
                break;
            }
            if (!currentPageId) {
                currentPageId = pageId;
            }
            const fields = [];
            const embed = {
                url: page.url,
                color: 0xffffff,
                description: "A bug has been reported on **Notion** on the **Issue Tracker** board.",
                timestamp: createdTime,
            };
            const name = page.properties.Name;
            if (name.title.length > 0) {
                embed.title = name.title[0].plain_text;
            }
            else {
                embed.title = "Untitled";
            }
            const status = page.properties.Status;
            if (status.status.name) {
                fields.push({
                    name: "Status",
                    value: status.status.name,
                });
            }
            const assignee = (0, parseArrayProperty_1.default)(page.properties.Assign, true);
            if (assignee) {
                fields.push({
                    name: "Assignee",
                    value: assignee,
                });
            }
            const place = (0, parseArrayProperty_1.default)(page.properties.Place);
            if (place) {
                fields.push({
                    name: "Place",
                    value: place,
                });
            }
            const type = (0, parseArrayProperty_1.default)(page.properties.Type);
            if (type) {
                fields.push({
                    name: "Type",
                    value: type,
                });
            }
            embed.fields = fields;
            yield (0, sendMessage_1.default)(webhookUrl, {
                embeds: [embed],
            });
        }
        return currentPageId;
    });
}
