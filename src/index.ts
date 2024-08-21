import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { APIEmbed, APIEmbedField } from "discord-api-types/v10";
import { configDotenv } from "dotenv";

import getInputs from "./getInputs";
import sendMessage from "./sendMessage";
import parseArrayProperty from "./parseArrayProperty";
import { loadLastPageId, saveCurrentPageId } from "./lastPage";

const MAX_PAGE_AGE = 45; // in minutes
const MAX_PAGE_COUNT = 20;

if (!process.env.GITHUB_ACTIONS) {
  configDotenv();
}

(async () => {
  const { NOTION_API_KEY, DATABASE_ID, WEBHOOK_URL } = getInputs();

  const notion = new Client({
    auth: NOTION_API_KEY,
  });

  const response = await notion.databases.query({
    database_id: DATABASE_ID!,
    page_size: MAX_PAGE_COUNT,
  });

  const lastPageId = await loadLastPageId();
  let currentPageId = "";

  for (const page of response.results as DatabaseObjectResponse[]) {
    const pageId = page.id;
    const createdTime = page.created_time;
    const timeElapsed =
      (new Date().getTime() - Date.parse(createdTime)) / 1000 / 60;

    if (pageId == lastPageId || timeElapsed > MAX_PAGE_AGE) {
      console.log("No new pages found");
      break;
    }

    if (!currentPageId) {
      currentPageId = pageId;
    }

    const fields: APIEmbedField[] = [];
    const embed: APIEmbed = {
      url: page.url,
      color: 0xffffff,
      description:
        "A bug has been reported on **Notion** on the **Issue Tracker** board.",
      timestamp: createdTime,
    };

    const name: any = page.properties.Name;
    if (name.title.length > 0) {
      embed.title = name.title[0].plain_text;
    } else {
      embed.title = "Untitled";
    }

    const status: any = page.properties.Status;
    if (status.status.name) {
      fields.push({
        name: "Status",
        value: status.status.name,
      });
    }

    const assign = parseArrayProperty(page.properties.Assign, true);
    if (assign) {
      fields.push({
        name: "Assign",
        value: assign,
      });
    }

    const place = parseArrayProperty(page.properties.Place);
    if (place) {
      fields.push({
        name: "Place",
        value: place,
      });
    }

    const type = parseArrayProperty(page.properties.Type);
    if (type) {
      fields.push({
        name: "Type",
        value: type,
      });
    }

    embed.fields = fields;

    await sendMessage(WEBHOOK_URL, {
      embeds: [embed],
    });
  }

  await saveCurrentPageId(currentPageId ? currentPageId : lastPageId);
})();
