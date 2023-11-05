const reconcile = require("../commands/reconcile");
const fs = require("fs");


describe("reconcile", () => {
  test("it should detect field discrepancies", async () => {
    // Define paths for source, target, and output CSV files
    const sourcePath = "tests/source.csv";
    const targetPath = "tests/target.csv";
    const outputPath = "tests/output.csv";

    // Mock the source and target CSV files with discrepancies
    const sourceCSV = "ID,Name,Date,Amount\n001,John Doe,2023-01-01,100.00\n";
    const targetCSV = "ID,Name,Date,Amount\n001,John Smith,2023-01-01,100.00\n";

    // Create temporary CSV files for testing
    fs.writeFileSync(sourcePath, sourceCSV);
    fs.writeFileSync(targetPath, targetCSV);

    // Call the reconcile function using await to handle the Promise
    const reconciliationReport = await reconcile(
      sourcePath,
      targetPath,
      outputPath
    );

    // Assert that there are field discrepancies in the reconciliation report
    const fieldDiscrepancies = reconciliationReport.filter(
      (record) => record.Type === "Field Discrepancy"
    );

    expect(fieldDiscrepancies.length).toBeGreaterThan(0);

    // Clean up the temporary files
    fs.unlinkSync(sourcePath);
    fs.unlinkSync(targetPath);
    fs.unlinkSync(outputPath);
  });


  test("it should detect missing fields in target", async () => {
    // Define paths for source, target, and output CSV files
    const sourcePath = "tests/source.csv";
    const targetPath = "tests/target.csv";
    const outputPath = "tests/output.csv";

    // Mock the source and target CSV files with discrepancies
    const sourceCSV = "ID,Name,Date,Amount\n001,John Doe,2023-01-01,100.00\n002,John Smith,2023-01-01,100.00";
    const targetCSV = "ID,Name,Date,Amount\n001,John Doe,2023-01-01,100.0\n";

    // Create temporary CSV files for testing
    fs.writeFileSync(sourcePath, sourceCSV);
    fs.writeFileSync(targetPath, targetCSV);

    // Call the reconcile function using await to handle the Promise
    const reconciliationReport = await reconcile(
      sourcePath,
      targetPath,
      outputPath
    );

    // Assert that there are field discrepancies in the reconciliation report
    const missingTarget = reconciliationReport.filter(
      (record) => record.Type === "Missing in Target"
    );

    expect(missingTarget.length).toBeGreaterThan(0);

    // Clean up the temporary files
    fs.unlinkSync(sourcePath);
    fs.unlinkSync(targetPath);
    fs.unlinkSync(outputPath);
  });

});
