import { Message, User, WebhookClient, WebhookMixin } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import FormData from "form-data";

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
  "ODM1MTUwODM3NjI5MTkwMjI0.YILQ1A.VuYR8rRBxqrQ3uUzcOqMPN5UjH4"
);
let hook = new WebhookClient(
  "835844126910054400",
  "BG5_uSYViR4y8Ga9EnCjSYbqsC06Gsu77m0si9NnUoa1EXoFZCVPSkhtWIkwIMfYw2Qh"
);

export default class ImposterCommand extends BaseCommand {
  constructor() {
    super("imposter", "fun", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    await message.delete();

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
  }
}
