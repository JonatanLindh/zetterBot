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
function toArchive(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        if (message.channel.id != "835153318866714674") {
            let guild = yield client.guilds.fetch("671283498723835914");
            let channel = yield client.channels.fetch("835153318866714674");
            let info = {
                userId: message.author.id,
                time: message.createdTimestamp,
            };
            let archivedMessage = yield channel
                .send(JSON.stringify(info) + "\n" + message.content, {
                files: message.attachments.array(),
                split: false,
                disableMentions: "all",
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
        let info = JSON.parse(message.content.slice(0, 52));
        let content = message.content.slice(52);
        let archivedMessage = yield reqMessage.channel
            .send(content, {
            files: message.attachments.array(),
            split: false,
            disableMentions: "all",
        })
            .then()
            .catch((err) => __awaiter(this, void 0, void 0, function* () {
            console.log(err);
            yield reqMessage.channel.send("Unable to retrieve archived message");
        }));
    });
}
exports.fromArchive = fromArchive;
