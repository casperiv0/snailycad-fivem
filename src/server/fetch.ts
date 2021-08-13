import axios, { AxiosResponse } from "axios";

export async function fetch<T = unknown>(
  path: string,
  data: T,
): Promise<AxiosResponse | undefined> {
  const url = GetConvar("snailycad_url", "null");

  if (url === "null") {
    // todo: setup logger
    return;
  }

  return axios({
    method: "POST",
    data,
    url: `${url}${path}`,
  });
}
