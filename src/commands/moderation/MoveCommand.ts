import {
  Channel,
  Guild,
  Message,
  MessageEmbed,
  User,
  WebhookClient,
  WebhookMixin,
} from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { config } from "dotenv";
config();

let editHook = new WebhookClient(
  "835844126910054400",
  process.env.DISCORD_BOT_TOKEN
);
let hook = new WebhookClient("835844126910054400", process.env.WEBHOOK_TOKEN);

export default class MoveCommand extends BaseCommand {
  constructor() {
    super("move", "moderation", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    await message.delete();

    if (message.author.id != "266524004121182209") return;

    const guild = await client.guilds.fetch("671283498723835914");
    const currentChannel = message.channel;

    let msgAmnt: number;
    let targetChannel: Channel;
    try {
      msgAmnt = parseInt(args[0]);
      targetChannel = await client.channels.fetch(
        args[1].substr(2, args[1].length - 3)
      );

      if (1 > msgAmnt || msgAmnt > 20) {
        throw new Error(":(");
      }
    } catch (e) {
      await message.reply(
        "Error parsing arguments\nFirst Argument: Positive integer <=20\nSecond Argument: Channel mention"
      );
      return;
    }

    const embed: MessageEmbed = new MessageEmbed().setDescription(
      `Moved **${msgAmnt}** messages to <#${targetChannel.id}>`
    );

    await currentChannel.messages
      .fetch({ limit: msgAmnt })
      .then(async (messages) => {
        await messages
          .array()
          .reverse()
          .forEach((m) =>
            this.moveMessage(guild, m, targetChannel).catch(console.error)
          );
        await message.reply({ embed });
      })
      .catch((e) => message.reply(e));
  }

  async moveMessage(guild: Guild, message: Message, targetChannel: Channel) {
    const messageAuthorMember = await guild.members.fetch(message.author.id);
    const messageAuthor = message.author;
    const content = message.content;

    await editHook.edit({
      channel: targetChannel.id,
    });

    await hook.send(content, {
      avatarURL: messageAuthor.avatarURL(),
      username: messageAuthorMember.nickname ?? messageAuthor.username,
    });

    await message.delete();
  }
}
