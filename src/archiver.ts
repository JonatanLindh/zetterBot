import {
  Message,
  Guild,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageMentions,
} from "discord.js";
import DiscordClient from "./client/client";

export default async function archiver(
  client: DiscordClient,
  message: Message
) {
  if (message.channel.id != "835153318866714674") {
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel: Channel = await client.channels.fetch("835153318866714674");
    await (channel as TextChannel)
      .send(message.content, {
        files: message.attachments.array(),
        split: true,
        disableMentions: "all",
      })
      .catch((err) => console.log(err));
  }
}