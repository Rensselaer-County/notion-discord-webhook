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
const client_1 = require("@notionhq/client");
const dotenv_1 = require("dotenv");
const MAX_PAGE_AGE = 45; // in minutes
(0, dotenv_1.configDotenv)();
function sendMessage(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(process.env.WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({ username: "Issue Tracker", avatar_url: "https://cdn.discordapp.com/attachments/1261742215265255426/1275173490575671347/Bug.jpg?ex=66c4ed5b&is=66c39bdb&hm=fe924ba2a4f9055fb11b318009f065bd4039946288428ddcdf325899b34e549f&" }, payload)),
        })
            .then((res) => {
            if (res.ok) {
                console.log("Message sent successfully");
            }
            else {
                console.error(`Connection was successful but could not send message: ${res.status}`);
            }
        })
            .catch((err) => {
            console.error(`Could not send message: ${err}`);
        });
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const notion = new client_1.Client({
        auth: process.env.NOTION_API_KEY,
    });
    const response = yield notion.databases.query({
        database_id: process.env.DATABASE_ID,
        page_size: 20,
    });
    for (const page of response.results) {
        const createdTime = page.created_time;
        const timeElapsed = (new Date().getTime() - Date.parse(createdTime)) / 1000 / 60;
        if (timeElapsed > MAX_PAGE_AGE) {
            break;
        }
        const property = page.properties.Name;
        if (property && property.title.length > 0) {
            const title = property.title[0].plain_text;
            yield sendMessage({
                embeds: [
                    {
                        title,
                        url: page.url,
                        color: 0xffffff,
                        description: "A bug has been reported on **Notion** on the **Issue Tracker** board.",
                        timestamp: createdTime,
                    },
                ],
            });
        }
    }
}))();
