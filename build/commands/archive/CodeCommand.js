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
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
class CodeCommand extends BaseCommand_1.default {
    constructor() {
        super("code", "archive", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let guild = yield client.guilds.fetch("671283498723835914");
            let channel = (yield client.channels.fetch("835153318866714674"));
            let lastMessage = channel.lastMessage;
            let mId = lastMessage.id;
            yield message.channel
                .send(`Archive code: ${mId}`)
                .catch((err) => console.log(err));
        });
    }
}
exports.default = CodeCommand;
