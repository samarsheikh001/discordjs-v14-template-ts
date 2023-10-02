import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../types";

const baseURL = "https://deepnudes.pro"

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("campaign")
        .addStringOption(option => {
            return option
                .setName("utm_source")
                .setDescription("referral source")
                .setRequired(true);
        })
        .addStringOption(option =>
            option.setName("utm_medium")
                .setDescription("medium")
                .setRequired(false))
        .addStringOption(option =>
            option.setName("utm_campaign")
                .setDescription("campaign")
                .setRequired(false))
        .addStringOption(option =>
            option.setName("utm_content")
                .setDescription("context for eg. link")
                .setRequired(false))
        .setDescription("Generates a URL with UTM parameters"),
    execute: async (interaction) => {
        const options: { [key: string]: string | number | boolean } = {};
        for (let i = 0; i < interaction.options.data.length; i++) {
            const element = interaction.options.data[i];
            if (element.name && element.value) options[element.name] = element.value;
        }

        let url = baseURL + '?';
        for (let key in options) {
            if (options[key]) {
                url += `${key}=${options[key]}&`;
            }
        }
        // Remove the last "&"
        url = url.slice(0, -1);

        interaction.reply({ content: `Here's your URL: ${url}` });
    },
    cooldown: 10
}

export default command