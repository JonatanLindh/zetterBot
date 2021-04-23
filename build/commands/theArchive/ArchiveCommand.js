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
const archiver_1 = require("../../archiver");
class ArchiveCommand extends BaseCommand_1.default {
    constructor() {
        super("archive", "theArchive", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let fetchedMessage;
            let failed = false;
            yield message.channel.messages
                .fetch(args[0])
                .then((fetched) => {
                fetchedMessage = fetched;
            })
                .catch((err) => __awaiter(this, void 0, void 0, function* () {
                yield message.channel
                    .send("Message not found")
                    .catch((err) => console.log(err));
                failed = true;
            }));
            if (failed) {
                return;
            }
            let aId = yield archiver_1.toArchive(client, fetchedMessage);
            let guild = yield client.guilds.fetch("671283498723835914");
            let channel = (yield client.channels.fetch("835153318866714674"));
            let embed = new discord_js_1.MessageEmbed()
                .setTitle("Message archived")
                .setDescription(`Archive code: **${aId}**`);
            yield message.channel.send(message.author, { embed: embed });
        });
    }
}
exports.default = ArchiveCommand;
