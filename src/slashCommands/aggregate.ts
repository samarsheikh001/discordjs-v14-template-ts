import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";
import { plausibleApi } from "../client/plausible";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("aggregate")
        .addStringOption(option => {
            return option
                .setName("period")
                .setDescription("Title of the embed message")
                .setRequired(false).addChoices(
                    { name: 'Last 12 months', value: '12mo' },
                    { name: 'Last 6 months', value: '6mo' },
                    { name: 'Current month', value: 'month' },
                    { name: 'Last 30 days', value: '30d' },
                    { name: 'Last 7 days', value: '7d' },
                    { name: 'Full day', value: 'day' },
                    { name: 'Custom range', value: 'custom' });

        })
        .setDescription("Shows aggregated metrics over a certain time period")
    ,
    execute: async (interaction) => {
        const options: { [key: string]: string | number | boolean } = {};
        if (!interaction.options) return interaction.editReply({ content: "Something went wrong..." });
        for (let i = 0; i < interaction.options.data.length; i++) {
            const element = interaction.options.data[i];
            if (element.name && element.value) options[element.name] = element.value;
        }

        const response = await plausibleApi.getAggregateStats(options?.period.toString() ?? "30d")
        const visitors = response.results.visitors.value;
        const bounceRate = response.results.bounce_rate.value;
        const pageviews = response.results.pageviews.value;
        const visitDuration = response.results.visit_duration.value;

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Analytics" })
                    .setDescription(`👥 Visitors : ${visitors} \n 🚪 Bounce Rate: ${bounceRate} \n 📊 Pageviews: ${pageviews} \n ⏳ Visit Duration: ${visitDuration} \n `)
                    .setColor(getThemeColor("text"))
            ]
        })
    },
    cooldown: 10
}

export default command