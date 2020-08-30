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
const jssoup_1 = __importDefault(require("jssoup"));
const rp = require("request-promise");
let callback = (response) => {
    var str = "";
    //another chunk of data has been received, so append it to `str`
    response.on("data", function (chunk) {
        str += chunk;
    });
    //the whole response has been received, so we just print it out here
    response.on("end", function () {
        return str;
    });
};
class PicCommand extends BaseCommand_1.default {
    constructor() {
        super("pic", "fun", []);
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let extra = "";
                if (!args) {
                    let imgURL = "https://source.unsplash.com/featured/?";
                }
                else {
                    let list1 = args;
                    yield list1.forEach((x) => {
                        extra += `${x.trim()}+`;
                    });
                    let url = `https://www.google.com/search?q=${extra}&tbm=isch`;
                    yield rp(url).then((response) => __awaiter(this, void 0, void 0, function* () {
                        let tree = yield new jssoup_1.default(response);
                        let imgURL = yield tree.findAll("img")[4].attrs.src;
                        yield message.reply({
                            embed: {
                                image: { url: imgURL },
                            },
                        });
                    }));
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = PicCommand;
