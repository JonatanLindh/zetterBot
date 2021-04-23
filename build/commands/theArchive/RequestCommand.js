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
const archiver_1 = require("../../archiver");
class RequestCommand extends BaseCommand_1.default {
    constructor() {
        super("request", "theArchive", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let code = args[0];
            if (code.length == "111111111111111111".length) {
                yield archiver_1.fromArchive(client, message, code);
            }
            else {
                yield message.reply("Invalid archive code");
            }
        });
    }
}
exports.default = RequestCommand;
