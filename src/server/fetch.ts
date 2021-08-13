import axios, { AxiosResponse } from "axios";
import { logger } from "./util/logger";

export async function fetch<T = unknown>(
  path: string,
  data: T,
): Promise<AxiosResponse | undefined> {
  const url = GetConvar("snailycad_url", "null");

  if (url === "null") {
    logger.warn("No `snailycad_url` convar was found in your server.cfg");
    return;
  }

  return axios({
    method: "POST",
    data,
    url: `${url}${path}`,
  });
}
