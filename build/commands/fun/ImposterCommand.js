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
const form_data_1 = __importDefault(require("form-data"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
let setChannel = (channelId) => {
    new Promise((resolve, reject) => {
        let url = "https://discord.com/api/webhooks/835844126910054400/BG5_uSYViR4y8Ga9EnCjSYbqsC06Gsu77m0si9NnUoa1EXoFZCVPSkhtWIkwIMfYw2Qh";
        const form = new form_data_1.default();
        form.append("channel_id", channelId);
        form.submit(url, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};
let editHook = new discord_js_1.WebhookClient("835844126910054400", process.env.DISCORD_BOT_TOKEN);
let hook = new discord_js_1.WebhookClient("835844126910054400", process.env.WEBHOOK_TOKEN);
class ImposterCommand extends BaseCommand_1.default {
    constructor() {
        super("imposter", "fun", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = yield client.guilds.fetch("671283498723835914");
            const victimMember = yield guild.members.fetch(message.mentions.users.first().id);
            const victim = message.mentions.users.first();
            const content = message.content.slice(message.content.indexOf(">") + 1);
            yield editHook.edit({
                channel: message.channel.id,
            });
            yield hook.send(content, {
                avatarURL: victim.avatarURL(),
                username: victimMember.nickname,
            });
            yield message.delete();
        });
    }
}
exports.default = ImposterCommand;
