import * as fs from "node:fs/promises";
import { createReadStream, createWriteStream, rmdirSync } from "node:fs";
import path from "node:path";
import archiver from "archiver";

const PATH = process.cwd();
const archive = archiver("zip", {
  zlib: { level: 9 },
});

const CLIENT_RELEASE = path.join(PATH, "release", "client");
const SERVER_RELEASE = path.join(PATH, "release", "server");

async function cleanReleaseFolder() {
  try {
    rmdirSync(CLIENT_RELEASE);
    rmdirSync(SERVER_RELEASE);
  } catch {}

  console.log("Done cleaning release folder");
}

async function zipRelease() {
  const output = createWriteStream(path.join(PATH, "release.zip"));
  archive.pipe(output);

  archive
    .append("fxmanifest.lua", {
      name: "fxmanifest.lua",
    })
    .directory("dist/client", "client")
    .directory("dist/server", "server")
    .finalize();
}

async function init() {
  await cleanReleaseFolder();

  await zipRelease();
}

init();
