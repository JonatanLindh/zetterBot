import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import JSSoup from "jssoup";
import http = require("http");
import rp = require("request-promise");

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

export default class PicCommand extends BaseCommand {
  constructor() {
    super("pic", "fun", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    try {
      let extra = "";
      if (!args) {
        let imgURL = "https://source.unsplash.com/featured/?";
      } else {
        let list1 = args;
        await list1.forEach((x) => {
          extra += `${x.trim()}+`;
        });
        let url = `https://www.google.com/search?q=${extra}&tbm=isch`;
        await rp(url).then(async (response) => {
          let tree = await new JSSoup(response);
          let imgURL = await tree.findAll("img")[4].attrs.src;
          await message.reply({
            embed: {
              image: { url: imgURL },
            },
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
