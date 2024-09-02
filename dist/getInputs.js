"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInputs;
const core_1 = require("@actions/core");
function getInputs() {
    if (process.env.GITHUB_ACTION) {
        return {
            NOTION_API_KEY: (0, core_1.getInput)("NOTION_API_KEY", { required: true }),
            BUGS_DATABASE_ID: (0, core_1.getInput)("BUGS_DATABASE_ID", { required: true }),
            TASKS_DATABASE_ID: (0, core_1.getInput)("TASKS_DATABASE_ID", { required: true }),
            BUGS_WEBHOOK_URL: (0, core_1.getInput)("BUGS_WEBHOOK_URL", { required: true }),
            TASKS_WEBHOOK_URL: (0, core_1.getInput)("TASKS_WEBHOOK_URL", { required: true }),
        };
    }
    else {
        return {
            NOTION_API_KEY: process.env.NOTION_API_KEY,
            BUGS_DATABASE_ID: process.env.BUGS_DATABASE_ID,
            TASKS_DATABASE_ID: process.env.TASKS_DATABASE_ID,
            BUGS_WEBHOOK_URL: process.env.BUGS_WEBHOOK_URL,
            TASKS_WEBHOOK_URL: process.env.TASKS_WEBHOOK_URL,
        };
    }
}
