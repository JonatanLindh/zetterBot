import { Message, User, WebhookClient, WebhookMixin } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import FormData from "form-data";
import { config } from "dotenv";
config();

let setChannel = (channelId: string) => {
  new Promise((resolve, reject) => {
    let url =
      "https://discord.com/api/webhooks/835844126910054400/BG5_uSYViR4y8Ga9EnCjSYbqsC06Gsu77m0si9NnUoa1EXoFZCVPSkhtWIkwIMfYw2Qh";
    const form = new FormData();
    form.append("channel_id", channelId);
    form.submit(url, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

let editHook = new WebhookClient(
  "835844126910054400",
  process.env.DISCORD_BOT_TOKEN
);
let hook = new WebhookClient("835844126910054400", process.env.WEBHOOK_TOKEN);

export default class ImposterCommand extends BaseCommand {
  constructor() {
    super("imposter", "fun", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const guild = await client.guilds.fetch("671283498723835914");
    const victimMember = await guild.members.fetch(
      message.mentions.users.first().id
    );
    const victim = message.mentions.users.first();
    const content = message.content.slice(message.content.indexOf(">") + 1);

    await editHook.edit({
      channel: message.channel.id,
    });

    await hook.send(content, {
      avatarURL: victim.avatarURL(),
      username: victimMember.nickname,
    });
    await message.delete();
  }
}
