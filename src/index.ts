import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { configDotenv } from "dotenv";

const POLL_RATE = 10; // in minutes

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

(async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID!,
    page_size: 20,
  });

  for (const page of response.results as DatabaseObjectResponse[]) {
    const createdTime = page.created_time;
    const timeElapsed =
      (new Date().getTime() - Date.parse(createdTime)) / 1000 / 60;

    if (timeElapsed > POLL_RATE) {
      break;
    }

    const property: any = page.properties.Name;

    if (property && property.title.length > 0) {
      const title = property.title[0].plain_text;

      await sendMessage({
        embeds: [
          {
            title,
            url: page.url,
            color: 0xffffff,
            description:
              "A bug has been reported on **Notion** on the **Issue Tracker** board.",
            timestamp: createdTime,
          },
        ],
      });
    }
  }
})();
