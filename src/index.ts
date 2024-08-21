import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { APIEmbed, APIEmbedField } from "discord-api-types/v10";
import { configDotenv } from "dotenv";

const MAX_PAGE_AGE = 45; // in minutes
const MAX_PAGE_COUNT = 20;

configDotenv();

async function sendMessage(payload: Record<string, any>) {
  return fetch(process.env.WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Issue Tracker",
      avatar_url:
        "https://cdn.discordapp.com/attachments/1261742215265255426/1275173490575671347/Bug.jpg?ex=66c4ed5b&is=66c39bdb&hm=fe924ba2a4f9055fb11b318009f065bd4039946288428ddcdf325899b34e549f&",
      ...payload,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log("Message sent successfully");
      } else {
        console.error(
          `Connection was successful but could not send message: ${res.status}`,
        );
      }
    })
    .catch((err) => {
      console.error(`Could not send message: ${err}`);
    });
}

function parseArrayProperty(
  array: any,
  isPerson?: boolean,
): string | undefined {
  const key = isPerson ? "people" : "multi_select";

  if (array[key].length <= 0) {
    return;
  }

  let value = "";

  for (const obj of array[key]) {
    value += obj.name + ", ";
  }

  value = value.slice(0, -2);

  return value;
}

(async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID!,
    page_size: MAX_PAGE_COUNT,
  });

  for (const page of response.results as DatabaseObjectResponse[]) {
    const createdTime = page.created_time;
    const timeElapsed =
      (new Date().getTime() - Date.parse(createdTime)) / 1000 / 60;

    if (timeElapsed > MAX_PAGE_AGE) {
      break;
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

    await sendMessage({
      embeds: [embed],
    });
  }
})();
