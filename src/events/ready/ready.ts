import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client: DiscordClient) {
    await client.user.setStatus("online");
    await client.user.setPresence({
      activity: {
        name: "kids screaming",
        type: "LISTENING",
      },
    });
    console.log("Bot has logged in.");
  }
}
