// pages/api/mint.js
const crypto = require("crypto");

export default function handler(req, res) {
  const { id } = req.query;
  const nonce = "0x" + crypto.randomBytes(16).toString("hex");

  const response = {
    x402Version: 1,
    id: "offer-" + (id || "1"),
    nonce,
    facilitator: "https://facilitator.coinbase.com/x402/confirm",
    accepts: [
      {
        scheme: "exact",
        network: "base",
        resource: "erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        asset: "USDC",
        amount: "1000000",
        decimals: 6,
        maxAmountRequired: "1",
        description: "Pay 1 USDC on Base to mint x402frogs collectible",
        mimeType: "application/vnd.x402+json",
        payTo: {
          uri: "base:0x1DEf6d9E7ba7256dF17d01Bf7D8FA62d82A27Fc4"
        }, // 👈 один об'єкт із ключем uri
        maxTimeoutSeconds: 600
      }
    ],
    metadata: {
      name: "x402frogs #" + (id || "1"),
      description:
        "Mint x402frogs collectible for 1 USDC (via Coinbase Facilitator)",
      image:
        "https://ipfs.io/ipfs/QmepBFK4YT8KwB4GNg3pwBdtDJy8kr8RtPgURTBdqt8fV8/1.png"
    }
  };

  res.setHeader("Content-Type", "application/json");
  res.status(402).end(JSON.stringify(response, null, 2));
}
