import { Message, Base } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
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

export default class PurgeCommand extends BaseCommand {
  constructor() {
    super("purge", "moderation", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 0 || deleteCount > 100) {
      message.reply("syntax: purge (2 < int < 100)");
    }

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1,
    });

    await fetched.forEach((msg) => {
      msg.delete().catch((error) => message.reply(`Error: ${error}`));
    });
  }
}
