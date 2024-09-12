import { saveCache as save, restoreCache as restore } from "@actions/cache";
import { writeFileSync, readFileSync, existsSync } from "fs";

import { Integration } from "./integrations";

const PATHS = ["bugs.txt", "tasks.txt"];
const CACHE_KEY = "last-pages";

export async function loadCache() {
  if (!process.env.GITHUB_ACTIONS) {
    return;
  }

  await restore(
    PATHS,
    `${CACHE_KEY}-${Number(process.env.GITHUB_RUN_NUMBER) - 1}`,
    [`${CACHE_KEY}-`],
  );
}

export async function saveCache() {
  if (!process.env.GITHUB_ACTIONS) {
    return;
  }

  PATHS.forEach((path) => {
    if (!existsSync(path)) {
      writeFileSync(path, "");
    }
  });

  await save(PATHS, `${CACHE_KEY}-${process.env.GITHUB_RUN_NUMBER}`);
}

export function getLastPageId(integration: Integration) {
  const path = PATHS[integration === "bugs" ? 0 : 1];

  if (existsSync(path)) {
    return readFileSync(path, "utf-8");
  } else {
    return "";
  }
}

export function setCurrentPageId(integration: Integration, pageId: string) {
  writeFileSync(PATHS[integration === "bugs" ? 0 : 1], pageId);
}
