import { build } from "esbuild";
import { globby } from "globby";

async function make() {
  const paths = await globby("src/**/*.ts");

  console.log(paths);

  build({
    bundle: true,
    logLevel: "info",
    entryPoints: paths,
    format: "cjs",
    outdir: "dist",
    treeShaking: true,
  });
}

make();
