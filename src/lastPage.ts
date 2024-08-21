import { saveCache, restoreCache } from "@actions/cache";
import { writeFileSync, readFileSync, existsSync } from "fs";

const PATHS = ["data.txt"];
const CACHE_KET = "lastPage";

export async function saveCurrentPageId(id: string) {
  writeFileSync(PATHS[0], id);

  if (process.env.GITHUB_ACTIONS) {
    await saveCache(PATHS, CACHE_KET);
  }
}

export async function loadLastPageId(): Promise<string> {
  const exists = process.env.GITHUB_ACTIONS
    ? await restoreCache(PATHS, CACHE_KET)
    : existsSync(PATHS[0]);

  if (exists) {
    return readFileSync(PATHS[0], "utf-8");
  } else {
    return "";
  }
}
