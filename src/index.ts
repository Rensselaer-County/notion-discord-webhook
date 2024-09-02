import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { APIEmbed, APIEmbedField } from "discord-api-types/v10";
import { configDotenv } from "dotenv";

import getInputs from "./getInputs";
import sendMessage from "./sendMessage";
import parseArrayProperty from "./parseArrayProperty";
import { loadCache, saveCache } from "./cache";
import { processIntegration } from "./integrations";

const MAX_PAGE_AGE = 45; // in minutes
const MAX_PAGE_COUNT = 20;

if (!process.env.GITHUB_ACTIONS) {
  configDotenv();
}

(async () => {
  const {
    NOTION_API_KEY,
    BUGS_DATABASE_ID,
    TASKS_DATABASE_ID,
    BUGS_WEBHOOK_URL,
    TASKS_WEBHOOK_URL,
  } = getInputs();

  const notion = new Client({
    auth: NOTION_API_KEY,
  });

  await loadCache();

  processIntegration(notion, BUGS_DATABASE_ID, BUGS_WEBHOOK_URL, "bugs");
  processIntegration(notion, TASKS_DATABASE_ID, TASKS_WEBHOOK_URL, "tasks");

  await saveCache();
})();
