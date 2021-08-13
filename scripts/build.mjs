import { build } from "esbuild";
import { globby } from "globby";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));

async function make() {
  const paths = await globby("src/**/*.ts");

  console.log(paths);

  build({
    external: pkg.dependecies,
    bundle: true,
    logLevel: "info",
    entryPoints: paths,
    format: "cjs",
    outdir: "dist",
    treeShaking: true,
  });
}

make();
