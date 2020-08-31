import { config } from "dotenv";
config();
import { registerCommands, registerEvents } from "./utils/registry";
import DiscordClient from "./client/client";
const client = new DiscordClient({});
import { keepAlive } from "./server";

(async () => {
  client.prefix = process.env.DISCORD_BOT_PREFIX || client.prefix;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  if (process.env.IN_CLOUD == "true") {
    keepAlive().catch((err) => console.log(err));
  }
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
