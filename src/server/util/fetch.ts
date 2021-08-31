import { logger } from "./logger";
import got from "got";

export async function fetch<T = unknown>(path: string, data: T) {
  const url = GetConvar("snailycad_url", "null");

  if (url === "null") {
    logger.warn("No `snailycad_url` convar was found in your server.cfg");
    return;
  }

  return got(`${url}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
