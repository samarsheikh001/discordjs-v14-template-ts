import { ActivityType, Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";
import { plausibleApi } from "../client/plausible";

const event: BotEvent = {
  name: "ready",
  once: true,
  execute: (client: Client) => {
    console.log(
      color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
    );
    setInterval(() => {
      plausibleApi
        .getRealtimeVisitors()
        .then((realtimeUsersCount: Number) => {
          client.user!.setActivity(`Realtime Users: ${realtimeUsersCount}`, {
            type: ActivityType.Custom
          });
        })
        .catch((error) => console.log(error));
    }, 10000); // Update every minute
  },
};

export default event;
