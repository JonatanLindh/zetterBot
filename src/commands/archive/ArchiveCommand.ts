import { Channel, Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import archiver from "../../archiver";

export default class CodeCommand extends BaseCommand {
  constructor() {
    super("code", "archive", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let aId: string = await archiver(client, message);
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel = (await client.channels.fetch(
      "835153318866714674"
    )) as TextChannel;
    let embed = new MessageEmbed()
      .setTitle("Message archived")
      .setDescription(`Archive code: ${aId}`);
    await message.channel.send(embed).catch((err) => console.log(err));
  }
}
