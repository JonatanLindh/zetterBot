"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let editHook = new discord_js_1.WebhookClient("835844126910054400", process.env.DISCORD_BOT_TOKEN);
let hook = new discord_js_1.WebhookClient("835844126910054400", process.env.WEBHOOK_TOKEN);
class MoveCommand extends BaseCommand_1.default {
    constructor() {
        super("move", "moderation", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = yield client.guilds.fetch("671283498723835914");
            const currentChannel = message.channel;
            let msgAmnt;
            let targetChannel;
            try {
                msgAmnt = parseInt(args[0]);
                targetChannel = yield client.channels.fetch(args[1].substr(2, args[1].length - 3));
                if (1 > msgAmnt || msgAmnt > 20) {
                    throw new Error(":(");
                }
            }
            catch (e) {
                yield message.reply("First Argument: positive integer <=20\nSecond Argument: Channel mention");
                return;
            }
            yield currentChannel.messages
                .fetch({ limit: msgAmnt })
                .then((messages) => {
                messages
                    .array()
                    .forEach((m) => this.moveMessage(client, guild, m, currentChannel, targetChannel));
            })
                .catch((e) => message.reply(e));
        });
    }
    moveMessage(client, guild, message, currentChannel, targetChannel) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageAuthorMember = yield guild.members.fetch(message.author.id);
            const messageAuthor = message.mentions.users.first();
            const content = message.content.slice(message.content.indexOf(">") + 1);
            yield editHook.edit({
                channel: targetChannel.id,
            });
            yield hook.send(content, {
                avatarURL: messageAuthor.avatarURL(),
                username: messageAuthorMember.nickname,
            });
            yield message.delete();
        });
    }
}
exports.default = MoveCommand;