module.exports = {
  name: 'help',
  description: 'Help Command.',
  execute(message, args) {
    const helpEmbed = {
      title: "Help",
      description: "Welcome to MusicFruit! I'm a music bot, hope \nyou will like me!\n\n[] - Optional parameter.\n<> - Required parameter.\n\nThis guild's prefix: `" + args.prefix + "`",
      color: 33679,
      fields: [
        {
          name: "General Commands",
          value: "`help` - The help command.\n`info` - Show info about the bot.\n`status` - Show the bot's status."
        },
        {
          name: "Music Commands",
          value: "`play <url>` - Play a music from YouTube.\n`pause` - Pause the current music.\n`queue` - View the current queue.\n`now` - View the now playing music.\n`join` - The bot will join to your vc.\n`leave` - The bot will leave to your vc."
        },
        {
          name: "Settings Commands",
          value: "`settings prefix <prefix>` - Set the custom prefix."
        }
      ],
      footer: {
        text: args.prefix + "help",
        icon_url: "https://cdn.discordapp.com/avatars/727895377751179324/0b08ac6228e890159c14734e7b8bb492.png?size=256"
      },
      timestamp: new Date()
    }

    message.channel.send({ embed: helpEmbed });
  },
};