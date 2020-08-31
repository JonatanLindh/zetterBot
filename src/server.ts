import express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send("Bot is alive");
});

export async function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is Ready!");
  });
}
