import { createHash, createPublicKey, verify } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const directory = resolve("release");
const base = "https://github.com/steaxss/deadbytimer-v2/releases/download/v4.0.0/";
const name = "Dead-by-Timer-4.0.0-Setup.exe";
const publicKey = createPublicKey({
  key: Buffer.from("302a300506032b6570032100a559be9d28c1a7d3e8b0d5547f2b4c747507d4104ef8b705590503f2a412597b", "hex"),
  format: "der",
  type: "spki",
});

async function download(url, limit) {
  const response = await fetch(url, { signal: AbortSignal.timeout(120000) });
  if (!response.ok || !response.body) throw new Error(`Download failed: ${response.status}`);
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > limit) throw new Error("Download exceeds limit");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

const envelope = JSON.parse((await download(`${base}update.json`, 65536)).toString("utf8"));
if (!verify(null, Buffer.from(envelope.payload), publicKey, Buffer.from(envelope.signature, "hex"))) {
  throw new Error("Installer publisher signature rejected");
}
const metadata = JSON.parse(envelope.payload);
if (metadata.version !== "4.0.0" || metadata.url !== `${base}${name}`
    || metadata.app_id !== "com.steaxs.deadbytimer.rust" || metadata.target !== "windows-x86_64"
    || metadata.format !== "nsis-machine-setup-v1" || !Number.isSafeInteger(metadata.size)
    || metadata.size <= 0 || metadata.size > 256 * 1024 * 1024) {
  throw new Error("Unexpected migration installer metadata");
}
const setup = await download(metadata.url, metadata.size);
if (setup.length !== metadata.size || createHash("sha256").update(setup).digest("hex") !== metadata.sha256) {
  throw new Error("Migration installer size or checksum rejected");
}
const sha512 = createHash("sha512").update(setup).digest("base64");
await mkdir(directory, { recursive: true });
await writeFile(resolve(directory, name), setup);
await writeFile(resolve(directory, "migration.yml"), [
  "version: 4.0.0", "files:", `  - url: ${name}`, `    sha512: ${sha512}`,
  `    size: ${setup.length}`, `path: ${name}`, `sha512: ${sha512}`,
  `releaseDate: '${new Date().toISOString()}'`, "",
].join("\n"));
console.log("Verified migration installer and prepared migration.yml");
