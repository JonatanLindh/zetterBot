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
const express = require("express");
const http = require("http");
const app = express();
if (process.env.PROJECT_DOMAIN) {
    app.get("/", (request, response) => {
        console.log(Date.now() + " Ping Received");
        response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
}
class PurgeCommand extends BaseCommand_1.default {
    constructor() {
        super("purge", "moderation", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteCount = parseInt(args[0], 10);
            if (!deleteCount || deleteCount < 0 || deleteCount > 100) {
                message.reply("syntax: purge (2 < int < 100)");
            }
            const fetched = yield message.channel.messages.fetch({
                limit: deleteCount + 1,
            });
            yield fetched.forEach((msg) => {
                msg.delete().catch((error) => message.reply(`Error: ${error}`));
            });
        });
    }
}
exports.default = PurgeCommand;
