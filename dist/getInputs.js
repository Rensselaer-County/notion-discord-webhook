"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInputs;
const core_1 = require("@actions/core");
function getInputs() {
    if (process.env.GITHUB_ACTION) {
        return {
            NOTION_API_KEY: (0, core_1.getInput)("NOTION_API_KEY", { required: true }),
            DATABASE_ID: (0, core_1.getInput)("DATABASE_ID", { required: true }),
            WEBHOOK_URL: (0, core_1.getInput)("WEBHOOK_URL", { required: true }),
        };
    }
    else {
        return {
            NOTION_API_KEY: process.env.NOTION_API_KEY,
            DATABASE_ID: process.env.DATABASE_ID,
            WEBHOOK_URL: process.env.WEBHOOK_URL,
        };
    }
}
