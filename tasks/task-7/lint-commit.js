import fs from "node:fs";

const TYPES = ["feat", "fix", "chore", "docs", "refactor", "test", "style"];

// Read file with commit message
const args = process.argv.slice(2);

const commitMsg = fs.readFileSync(args[0], "utf8");

if (TYPES.some((type) => commitMsg.startsWith(`${type}:`))) {
  console.log("VALID COMMIT");
  process.exit(0);
}

if (commitMsg.startsWith("Merge branch")) {
  console.log("VALID MERGE");
  process.exit(0);
}

process.exit(1);
