import { build } from "esbuild";
import { globby } from "globby";

async function make() {
  const paths = await globby("src/**/*.ts");

  console.log(paths);

  build({
    bundle: true,
    logLevel: "info",
    entryPoints: ["./src/server/server.ts", "./src/client/client.ts"],
    format: "cjs",
    outdir: "dist",
    platform: "node",
  });
}

make();
