import { Channel, Guild, Message, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class CodeCommand extends BaseCommand {
  constructor() {
    super("code", "archive", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel: Channel = await client.channels.fetch("835153318866714674");
    if (channel.isText()) {
      channel.send("Test Log!");
    }
  }
}
