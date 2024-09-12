import { Client } from "@notionhq/client";
import { configDotenv } from "dotenv";

import getInputs from "./getInputs";
import { loadCache, saveCache } from "./cache";
import { processIntegration } from "./integrations";

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
