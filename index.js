#! /usr/bin/env node

const { program } = require("commander");
const reconcile = require("./commands/reconcile");


program
  .command("reconcile <source> <target> <output>")
  .description("Reconcile between source and target csv files")
  .option("-s, --source <source>", "source CSV path")
  .option("-t, --target <target>", "target CSV path")
  .option(
    "-o, --output <output>",
    "reconciliation report output path"
  )
  .action(reconcile);

program.parse();
