// run-script.js

// Import the lodash package
const aptos = require("@aptos-labs/ts-sdk");
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");
const { getPackageBytesToPublish } = require("./utils");

/** run our demo! */
async function main() {
  const aptosClient = new aptos.Aptos();

  const alice = aptos.Account.generate();

  console.log("\n=== Addresses ===");
  console.log(`Alice: ${alice.accountAddress.toString()}`);

  await aptosClient.fundAccount({
    accountAddress: alice.accountAddress,
    amount: 100_000_000,
  });

  console.log("\n=== Compiling the package locally ===");
  const move = new cli.Move();
  await move.buildPublishPayload({
    outputFile: "contract/facoin/facoin.json",
    packageDirectoryPath: "contract/facoin",
    namedAddresses: {
      MoonCoin: alice.accountAddress.toString(),
    },
    extraArguments: ["--assume-yes"],
  });
  const { metadataBytes, byteCode } = getPackageBytesToPublish(
    "contract/facoin/facoin.json"
  );

  console.log("\n===Publishing package===");
  const transaction = await aptosClient.publishPackageTransaction({
    account: alice.accountAddress,
    metadataBytes,
    moduleBytecode: byteCode,
  });
  const response = await aptosClient.signAndSubmitTransaction({
    signer: alice,
    transaction,
  });
  console.log(`Transaction hash: ${response.hash}`);
  await aptosClient.waitForTransaction({
    transactionHash: response.hash,
  });
}

main();
