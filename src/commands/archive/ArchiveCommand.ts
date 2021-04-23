import { Channel, Guild, Message, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class CodeCommand extends BaseCommand {
  constructor() {
    super("code", "archive", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel = (await client.channels.fetch(
      "835153318866714674"
    )) as TextChannel;
    let lastMessage: Message = channel.lastMessage;
    let mId: string = lastMessage.id;
    await message.channel
      .send(`Archive code: ${mId}`)
      .catch((err) => console.log(err));
  }
}
