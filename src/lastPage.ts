import { saveCache, restoreCache } from "@actions/cache";
import { writeFileSync, readFileSync, existsSync } from "fs";

const PATHS = ["data.txt"];
const CACHE_KEY = "last-page";

export async function saveCurrentPageId(id: string) {
  writeFileSync(PATHS[0], id);

  if (process.env.GITHUB_ACTIONS) {
    await saveCache(PATHS, `${CACHE_KEY}-${process.env.GITHUB_RUN_NUMBER}`);
  }
}

export async function loadLastPageId(): Promise<string> {
  const exists = process.env.GITHUB_ACTIONS
    ? await restoreCache(
        PATHS,
        `${CACHE_KEY}-${Number(process.env.GITHUB_RUN_NUMBER) - 1}`,
        [`${CACHE_KEY}-`],
      )
    : existsSync(PATHS[0]);

  if (exists) {
    return readFileSync(PATHS[0], "utf-8");
  } else {
    return "";
  }
}
