import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class ImposterCommand extends BaseCommand {
  constructor() {
    super('imposter', 'fun', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('imposter command works');
  }
}