import {
  Message,
  Guild,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageMentions,
  User,
} from "discord.js";
import { type } from "node:os";
import DiscordClient from "./client/client";

export async function toArchive(client: DiscordClient, message: Message) {
  let id: string;
  if (message.channel.id != "835153318866714674") {
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel: Channel = await client.channels.fetch("835153318866714674");

    let info = {
      userId: message.author.id,
      time: message.createdTimestamp,
    };

    let archivedMessage = await (channel as TextChannel)
      .send(JSON.stringify(info) + "\n" + message.content, {
        files: message.attachments.array(),
        split: false,
        disableMentions: "all",
      })
      .then((sent) => {
        id = sent.id;
      })
      .catch((err) => {
        console.log(err);
      });
    return id;
  }
}

export async function fromArchive(
  client: DiscordClient,
  reqMessage: Message,
  code: string
) {
  let guild: Guild = await client.guilds.fetch("671283498723835914");
  let channel: Channel = await client.channels.fetch("835153318866714674");

  let message: Message = await (channel as TextChannel).messages
    .fetch(code)
    .catch(async (err) => {
      await reqMessage.channel.send("Unable to retrieve archived message");
      return reqMessage;
    });
  if (message === reqMessage) {
    return;
  }
  let info = JSON.parse(message.content.slice(0, 52));
  let content: string = message.content.slice(52);

  let archivedMessage = await (reqMessage.channel as TextChannel)
    .send(content, {
      files: message.attachments.array(),
      split: false,
      disableMentions: "all",
    })
    .then()
    .catch(async (err) => {
      console.log(err);
      await reqMessage.channel.send("Unable to retrieve archived message");
    });
}
