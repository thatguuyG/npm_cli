const fs = require("fs");
const fastcsv = require("fast-csv");
const chalk = require("chalk");

/**
 * Function to check if a file is a csv file
 * @param {*} fileName
 * @returns
 */
function isCSVFileName(fileName) {
  return fileName.endsWith(".csv");
}

/**
 * Function that reconciles differences between 2 csv files
 * @param {String} sourcePath
 * @param {String} targetPath
 * @param {String} outputPath
 * @param {Boolean} isTest
 */
function reconcile(sourcePath, targetPath, outputPath, isTest = false) {
  return new Promise((resolve, reject) => {
      // add basic error validation
  if (!isCSVFileName(sourcePath) || !isCSVFileName(targetPath)) {
    console.error(
      chalk.red.bold("Source and target files must have a .csv extension.")
    );
    process.exit(1);
  }

  if (!fs.existsSync(sourcePath) || !fs.existsSync(targetPath)) {
    console.error(chalk.red.bold("Source and target files not found."));
    process.exit(1);
  }

  const inputFile = {};
  const outputFile = {};
  const missingInTarget = [];
  const missingInSource = [];
  const fieldDiscrepancies = [];

  // Read the source CSV file
  fs.createReadStream(sourcePath)
    .pipe(fastcsv.parse({ headers: true }))
    .on("data", (data) => {
      inputFile[data.ID] = data;
    })
    .on("end", () => {
      // Read the input CSV file
      fs.createReadStream(targetPath)
        .pipe(fastcsv.parse({ headers: true }))
        .on("data", (data) => {
          outputFile[data.ID] = data;

          // Check for records missing in input
          if (!inputFile[data.ID]) {
            missingInSource.push({
              Type: "Missing in Source",
              "Record Identifier": data.ID,
            });
          }

          // field discrepancies
          if (inputFile[data.ID]) {
            for (const key in data) {
              if (data[key] !== inputFile[data.ID][key]) {
                fieldDiscrepancies.push({
                  Type: "Field Discrepancy",
                  "Record Identifier": data.ID,
                  Field: key,
                  "Source Value": inputFile[data.ID][key],
                  "Target Value": data[key],
                });
              }
            }
          }
        })
        .on("end", () => {
          // Check for records missing in output target
          for (const sourceID in inputFile) {
            if (!outputFile[sourceID]) {
              missingInTarget.push({
                Type: "Missing in Target",
                "Record Identifier": sourceID,
              });
            }
          }

          const reconciliationReport = [
            ...missingInTarget,
            ...missingInSource,
            ...fieldDiscrepancies,
          ];

          // Write output file
          const csvData = [
            "Type,Record Identifier,Field,Source Value,Target Value",
            ...reconciliationReport.map(
              (record) =>
                `${record.Type},${record["Record Identifier"]},${
                  record.Field || ""
                },${record["Source Value"] || ""},${
                  record["Target Value"] || ""
                }`
            ),
          ];
          fs.writeFileSync(outputPath, csvData.join("\n"));

          if (isTest) {
            console.log(chalk.green.bold("Reconciliation completed:"));
            console.log(
              chalk.red.bold(
                `- Records missing in target: ${missingInTarget.length}`
              )
            );
            console.log(
              chalk.red.bold(
                `- Records missing in source: ${missingInSource.length}`
              )
            );
            console.log(
              chalk.yellow.bold(
                `- Records with field discrepancies: ${fieldDiscrepancies.length}`
              )
            );
            console.log(chalk.green.bold(`Report saved to: ${outputPath}`));
          } else {
            // return actual result to test function
            resolve(reconciliationReport);
          }

        });
    });
  });
}

module.exports = reconcile;
