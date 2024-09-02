import { getInput } from "@actions/core";

interface Inputs {
  NOTION_API_KEY: string;
  BUGS_DATABASE_ID: string;
  TASKS_DATABASE_ID: string;
  BUGS_WEBHOOK_URL: string;
  TASKS_WEBHOOK_URL: string;
}

export default function getInputs(): Inputs {
  if (process.env.GITHUB_ACTION) {
    return {
      NOTION_API_KEY: getInput("NOTION_API_KEY", { required: true }),
      BUGS_DATABASE_ID: getInput("BUGS_DATABASE_ID", { required: true }),
      TASKS_DATABASE_ID: getInput("TASKS_DATABASE_ID", { required: true }),
      BUGS_WEBHOOK_URL: getInput("BUGS_WEBHOOK_URL", { required: true }),
      TASKS_WEBHOOK_URL: getInput("TASKS_WEBHOOK_URL", { required: true }),
    };
  } else {
    return {
      NOTION_API_KEY: process.env.NOTION_API_KEY!,
      BUGS_DATABASE_ID: process.env.BUGS_DATABASE_ID!,
      TASKS_DATABASE_ID: process.env.TASKS_DATABASE_ID!,
      BUGS_WEBHOOK_URL: process.env.BUGS_WEBHOOK_URL!,
      TASKS_WEBHOOK_URL: process.env.TASKS_WEBHOOK_URL!,
    };
  }
}
