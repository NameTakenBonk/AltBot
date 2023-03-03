const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('postevent')
		.setDescription('Posts an event.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription("The Channel to send it to")
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('type')
            .setDescription('The type of event that will be hosted.')
            .setRequired(true)
            .addChoices(
                { name: "SSU", value: "ssu" },
                { name: "GRP", value: "grp"},
            )),
	async execute(interaction) {
        const member = interaction.member

        if (member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            if (interaction.options.getString('type') == "ssu") {
                const ssuembed = new EmbedBuilder()
                .setColor(0x009FF)
                .setTitle("Server Startup Event!")
                .setURL("https://www.roblox.com/games/10606447338/Expedition-One")
                .setAuthor({
                    name: `<@${interaction.user.id}>`
                })
                .setDescription(
                    "A Server Startup is now being hosted, 6 reactions and the ssu will begin. Get the game active and have fun! \n @everyone"
                )
                const message = await interaction.options.getChannel('channel').send({embeds: [ssuembed]});
                message.react('👍');
                message.react('👎');
            } if (interaction.options.getString('type') == "grp") {
                const grpembed = new EmbedBuilder()
                .setColor(0x009FF)
                .setTitle("Group Recruiting Plaza Event!")
                .setURL("https://www.roblox.com/games/5118029260/Group-Recruiting-Plaza-6-5")
                .setAuthor({
                    name: `<@${interaction.user.id}>`
                })
                .setDescription(
                    `Group Recruiting Plaza Event has started, join the game to help us gain more members! Not much people are required to join. \n @here`
                )
    
                const message = await interaction.options.getChannel('channel').send({embeds: [grpembed]});
                message.react('👍');
                message.react('👎');
            }
        } else{
            await interaction.reply("You don't have the permissions to send this!");
        }

        
	},
};