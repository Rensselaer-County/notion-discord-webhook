import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { APIEmbed, APIEmbedField } from "discord-api-types/v10";

import { MAX_PAGE_AGE } from ".";
import parseArrayProperty from "../parseArrayProperty";
import sendMessage from "../sendMessage";

export default async function (
  response: DatabaseObjectResponse[],
  webhookUrl: string,
  lastPageId: string,
) {
  let currentPageId = "";

  for (const page of response) {
    const pageId = page.id;
    const createdTime = page.created_time;
    const timeElapsed =
      (new Date().getTime() - Date.parse(createdTime)) / 1000 / 60;

    if (pageId == lastPageId || timeElapsed > MAX_PAGE_AGE) {
      console.log("No new tasks found");
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
        "A new task has been added on **Notion** to the **Tasks** board.",
      timestamp: createdTime,
    };

    const name: any = page.properties.Name;
    if (name.title.length > 0) {
      embed.title = name.title[0].plain_text;
    } else {
      embed.title = "Untitled";
    }

    const status: any = page.properties.Status;
    if (status.status && status.status.name) {
      fields.push({
        name: "Status",
        value: status.status.name,
      });
    }

    const priority: any = page.properties.Priority;
    if (priority.select && priority.select.name) {
      fields.push({
        name: "Priority",
        value: priority.select.name,
      });
    }

    const assignee = parseArrayProperty(page.properties.Assignee, true);
    if (assignee) {
      fields.push({
        name: "Assignee",
        value: assignee,
      });
    }

    embed.fields = fields;

    await sendMessage(webhookUrl, {
      embeds: [embed],
    });
  }

  return currentPageId;
}
