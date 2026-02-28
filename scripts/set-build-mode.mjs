import { writeFileSync } from 'fs';

const mode = process.argv[2];
if (mode !== 'prod' && mode !== 'test') {
  console.error('Usage: node scripts/set-build-mode.mjs <prod|test>');
  process.exit(1);
}

writeFileSync(
  './electron/build-flags.cjs',
  `module.exports = { buildMode: '${mode}' };\n`
);

console.log(`[build-mode] set to "${mode}"`);
