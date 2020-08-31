import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class ResetnicksCommand extends BaseCommand {
  constructor() {
    super("resetnicks", "moderation", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (message.member.roles.cache.has("748988177682792496") === true) {
      let members = await message.guild.members.fetch();
      members.array().forEach(async (member) => {
        await member.setNickname(null);
      });
      message.reply("Attempting to reset all nicknames...");
    }
  }
}
