// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
import {
  Message,
  Guild,
  Channel,
  TextChannel,
  MessageAttachment,
  MessageMentions,
} from "discord.js";
import { toArchive } from "../core/archiver";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client: DiscordClient, message: Message) {
    if (!message.author.bot) {
      await toArchive(client, message);
    }
  }
}
