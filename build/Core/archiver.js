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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromArchive = exports.toArchive = void 0;
const discord_js_1 = require("discord.js");
function toArchive(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        if (message.channel.id != "835153318866714674") {
            let guild = yield client.guilds.fetch("671283498723835914");
            let channel = yield client.channels.fetch("835153318866714674");
            const info = {
                userId: message.author.id,
                channelId: message.channel.id,
                time: message.createdAt,
            };
            const embed = new discord_js_1.MessageEmbed()
                .setFooter(message.author.username, message.author.avatarURL())
                .setDescription(`**Sent in: **<#${message.channel.id}>`)
                .setTimestamp(message.createdTimestamp);
            let archivedMessage = yield channel
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
    });
}
exports.toArchive = toArchive;
function fromArchive(client, reqMessage, code) {
    return __awaiter(this, void 0, void 0, function* () {
        let guild = yield client.guilds.fetch("671283498723835914");
        let channel = yield client.channels.fetch("835153318866714674");
        let message = yield channel.messages
            .fetch(code)
            .catch((err) => __awaiter(this, void 0, void 0, function* () {
            yield reqMessage.channel.send("Unable to retrieve archived message");
            return reqMessage;
        }));
        if (message === reqMessage) {
            return;
        }
        // let infoEndIndex: number = message.content.indexOf("}\n") + 1;
        // let info = JSON.parse(message.content.slice(0, infoEndIndex));
        // let content: string = message.content.slice(infoEndIndex + 1);
        let content = message.content;
        let archivedMessage = yield reqMessage.channel
            .send(content, {
            files: message.attachments.array(),
            split: false,
            disableMentions: "all",
            embed: message.embeds[message.embeds.length - 1],
        })
            .then()
            .catch((err) => __awaiter(this, void 0, void 0, function* () {
            console.log(err);
            yield reqMessage.channel.send("Unable to retrieve archived message");
        }));
    });
}
exports.fromArchive = fromArchive;
