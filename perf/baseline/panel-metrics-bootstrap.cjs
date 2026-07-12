import("./panel-metrics.mjs").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
