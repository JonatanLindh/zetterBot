import {
  Message,
  Guild,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageMentions,
  User,
  MessageEmbed,
} from "discord.js";
import { type } from "node:os";
import DiscordClient from "./client/client";
import { MessageBuilder, Webhook } from "discord-webhook-node";
import { request } from "node:http";
import FormData from "form-data";
import { rejects } from "node:assert";

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

const hook: Webhook = new Webhook(
  "https://discord.com/api/webhooks/835844126910054400/BG5_uSYViR4y8Ga9EnCjSYbqsC06Gsu77m0si9NnUoa1EXoFZCVPSkhtWIkwIMfYw2Qh"
);

export async function toArchive(client: DiscordClient, message: Message) {
  let id: string;
  if (message.channel.id != "835153318866714674") {
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel: Channel = await client.channels.fetch("835153318866714674");

    const info = {
      userId: message.author.id,
      channelId: message.channel.id,
      time: message.createdAt,
    };

    const embed: MessageEmbed = new MessageEmbed()
      .setFooter(message.author.username, message.author.avatarURL())
      .setDescription(`**Sent in: **<#${message.channel.id}>`)
      .setTimestamp(message.createdTimestamp);

    let archivedMessage = await (channel as TextChannel)
      .send(message.content, {
        files: message.attachments.array(),
        split: false,
        disableMentions: "all",
        embed: embed,
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

  // let infoEndIndex: number = message.content.indexOf("}\n") + 1;
  // let info = JSON.parse(message.content.slice(0, infoEndIndex));
  // let content: string = message.content.slice(infoEndIndex + 1);
  let content: string = message.content;

  let archivedMessage = await (reqMessage.channel as TextChannel)
    .send(content, {
      files: message.attachments.array(),
      split: false,
      disableMentions: "all",
      embed: message.embeds[message.embeds.length - 1],
    })
    .then()
    .catch(async (err) => {
      console.log(err);
      await reqMessage.channel.send("Unable to retrieve archived message");
    });
}
