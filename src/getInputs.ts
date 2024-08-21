import { getInput } from "@actions/core";

interface Inputs {
  NOTION_API_KEY: string;
  DATABASE_ID: string;
  WEBHOOK_URL: string;
}

export default function getInputs(): Inputs {
  if (process.env.GITHUB_ACTION) {
    return {
      NOTION_API_KEY: getInput("NOTION_API_KEY", { required: true }),
      DATABASE_ID: getInput("DATABASE_ID", { required: true }),
      WEBHOOK_URL: getInput("WEBHOOK_URL", { required: true }),
    };
  } else {
    return {
      NOTION_API_KEY: process.env.NOTION_API_KEY!,
      DATABASE_ID: process.env.DATABASE_ID!,
      WEBHOOK_URL: process.env.WEBHOOK_URL!,
    };
  }
}
