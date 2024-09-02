import { Client } from "@notionhq/client";

import bugs from "./bugs";
import tasks from "./tasks";
import { getLastPageId, setCurrentPageId } from "../cache";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const MAX_PAGE_AGE = 45; // in minutes
const MAX_PAGE_COUNT = 20;

export type Integration = "bugs" | "tasks";

export async function processIntegration(
  notion: Client,
  databaseId: string,
  webhookUrl: string,
  integration: Integration,
) {
  const response = (
    await notion.databases.query({
      database_id: databaseId,
      page_size: MAX_PAGE_COUNT,
    })
  ).results as DatabaseObjectResponse[];

  const lastPageId = getLastPageId("bugs");
  let currentPageId = "";

  if (integration === "bugs") {
    currentPageId = await bugs(response, webhookUrl, lastPageId);
  } else if (integration == "tasks") {
    currentPageId = await tasks(response, webhookUrl, lastPageId);
  }

  if (currentPageId) {
    setCurrentPageId(integration, currentPageId);
  }
}
