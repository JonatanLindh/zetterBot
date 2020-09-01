import { Message, Base, GuildMember, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class PurgeCommand extends BaseCommand {
  constructor() {
    super("purge", "moderation", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.member.roles.cache.has("748988177682792496") === true) {
      const deleteCount = parseInt(args[0], 10);
      if (!deleteCount || deleteCount < 0 || deleteCount > 152) {
        message.reply("syntax: purge (2 < int < 100)");
        return;
      }
      await message.channel.send("Deleting " + deleteCount + " messages...");
      (message.channel as TextChannel)
        .bulkDelete(deleteCount + 2, true)
        .catch((err) => console.log(err));
    }
  }
}
