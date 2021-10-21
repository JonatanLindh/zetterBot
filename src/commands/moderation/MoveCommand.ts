import {
  Channel,
  Guild,
  Message,
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
        "First Argument: positive integer <=20\nSecond Argument: Channel mention"
      );
      return;
    }

    await currentChannel.messages
      .fetch({ limit: msgAmnt })
      .then((messages) => {
        messages
          .array()
          .forEach((m) =>
            this.moveMessage(client, guild, m, currentChannel, targetChannel)
          );
      })
      .catch((e) => message.reply(e));
  }

  async moveMessage(
    client: DiscordClient,
    guild: Guild,
    message: Message,
    currentChannel: Channel,
    targetChannel: Channel
  ) {
    const messageAuthorMember = await guild.members.fetch(message.author.id);
    const messageAuthor = message.mentions.users.first();
    const content = message.content.slice(message.content.indexOf(">") + 1);

    await editHook.edit({
      channel: targetChannel.id,
    });

    await hook.send(content, {
      avatarURL: messageAuthor.avatarURL(),
      username: messageAuthorMember.nickname,
    });
    await message.delete();
  }
}
