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
class PurgeCommand extends BaseCommand_1.default {
    constructor() {
        super("purge", "moderation", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.member.roles.cache.has("748988177682792496") === true) {
                const deleteCount = parseInt(args[0], 10);
                if (!deleteCount || deleteCount < 0 || deleteCount > 152) {
                    message.reply("syntax: purge (2 < int < 100)");
                    return;
                }
                yield message.channel.send("Deleting " + deleteCount + " messages...");
                message.channel
                    .bulkDelete(deleteCount + 2, true)
                    .catch((err) => console.log(err));
            }
        });
    }
}
exports.default = PurgeCommand;
