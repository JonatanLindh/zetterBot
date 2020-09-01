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
const BaseEvent_1 = __importDefault(require("../utils/structures/BaseEvent"));
class MessageEvent extends BaseEvent_1.default {
    constructor() {
        super("message");
    }
    run(client, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let banwords = ["follow", "nigger", "nigga", "subscribe"];
            if (banwords.some((word) => message.content.toLowerCase().includes(word))) {
                yield message.react("❌");
                return;
            }
            if (message.channel.type == "dm") {
                let guild = yield client.guilds.fetch("748988071973879921");
                let channel = yield client.channels.fetch("749658927527886938");
                yield channel
                    .send(message.content, {
                    files: message.attachments.array(),
                    split: true,
                    disableMentions: "all",
                })
                    .catch((err) => console.log(err));
                yield message.react("✅");
            }
        });
    }
}
exports.default = MessageEvent;
