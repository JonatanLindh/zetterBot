import { Channel, Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { fromArchive } from "../../core/archiver";

export default class RequestCommand extends BaseCommand {
  constructor() {
    super("request", "theArchive", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    try {
      let code: string = args[0];
      if (code.length == "111111111111111111".length) {
        await fromArchive(client, message, code);
      } else {
        await message.reply("Invalid archive code");
      }
    } catch (e) {
      console.error(e);
    }
  }
}
