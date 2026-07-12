import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const maximumLines = 450;
const sourceExtensions = new Set([
  ".c",
  ".cjs",
  ".cpp",
  ".css",
  ".h",
  ".js",
  ".mjs",
  ".ps1",
  ".ts",
  ".tsx",
]);
const ignoredDirectories = new Set([
  ".git",
  "dist",
  "node_modules",
  "release",
]);

async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collect(path));
    } else if (sourceExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

const violations = [];
for (const path of await collect(root)) {
  if (relative(root, path).startsWith(join("perf", "artifacts"))) continue;
  const contents = await readFile(path, "utf8");
  const lineCount = contents === "" ? 0 : contents.split(/\r?\n/u).length;
  if (lineCount > maximumLines) {
    violations.push(`${relative(root, path)}: ${lineCount} lines`);
  }
}

if (violations.length > 0) {
  console.error(`Source files must not exceed ${maximumLines} lines:\n${violations.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`All maintained source files are within ${maximumLines} lines.`);
}
