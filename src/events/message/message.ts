import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import aliases from "../../commandAliases";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);

      if (command) {
        command.run(client, message, cmdArgs);
      } else {
        // Alias handler
        if (cmdName in aliases) {
          const command = client.commands.get(aliases[cmdName]);
          command.run(client, message, cmdArgs);
        }
      }
    }
  }
}
