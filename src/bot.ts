import { config } from "dotenv";
config();
import { registerCommands, registerEvents } from "./utils/registry";
import DiscordClient from "./client/client";
const client = new DiscordClient({});
import express = require("express");
import http = require("http");
const app = express();

if (process.env.PROJECT_DOMAIN) {
  app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);
}

(async () => {
  client.prefix = process.env.DISCORD_BOT_PREFIX || client.prefix;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
