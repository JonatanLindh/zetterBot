import { Message, Guild, Channel, TextChannel, MessageEmbed } from "discord.js";
import DiscordClient from "../client/client";

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
