const path = require("path");
const fs = require("fs");

/**
 * A convenience function to get the compiled package metadataBytes and byteCode
 * @param {string} filePath - The path of the file that contains the package JSON output.
 * @returns {{metadataBytes: any, byteCode: any}} - The metadataBytes and byteCode from the JSON file.
 */
function getPackageBytesToPublish(filePath) {
  // Get the current working directory
  const cwd = process.cwd();
  // Generate the path to the JSON output file
  const modulePath = path.join(cwd, filePath);
  console.log("modulePath", modulePath);
  // Read and parse the JSON file
  const jsonData = JSON.parse(fs.readFileSync(modulePath, "utf8"));

  // Extract metadataBytes and byteCode from the parsed JSON data
  const metadataBytes = jsonData.args[0].value;
  const byteCode = jsonData.args[1].value;

  return { metadataBytes, byteCode };
}

// Export the functions for use in other modules
module.exports = {
  getPackageBytesToPublish,
};
