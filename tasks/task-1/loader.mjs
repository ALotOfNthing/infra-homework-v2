import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import yaml from "yaml";

export async function load(url, context, defaultLoad) {
  const format = context.format;

  console.debug(url);
  console.debug(context);
  console.debug(fileURLToPath(url));
  if (url.startWith('file://')) {
    const filePath = fileURLToPath(url);
    const fileExtName = path.extname(filePath);
    let fileSource = fs.readFileSync(filePath, "utf8");
  
    if (fileExtName === "yaml" || fileExtName === "yml") {
      console.debug(yaml.parse(fileSource));
    }
  }

  return { format, source: fileSource, shortCircuit: true };
}
