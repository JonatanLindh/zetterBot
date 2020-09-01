// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
import {
  Message,
  Guild,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageMentions,
} from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.channel.type == "dm") {
      if (!message.mentions.everyone) {
        let guild: Guild = await client.guilds.fetch("748988071973879921");
        let channel: Channel = await client.channels.fetch(
          "749658927527886938"
        );
        await (channel as TextChannel)
          .send(message.content, {
            files: message.attachments.array(),
            split: true,
          })
          .catch((err) => console.log(err));
      }
    }
  }
}
