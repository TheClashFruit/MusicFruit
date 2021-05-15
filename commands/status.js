module.exports = {
  name: 'status',
  description: 'Status Command.',
  async execute(message, args) {
    const prettyMilliseconds = require("pretty-ms");

    const uptime = prettyMilliseconds(args.botClient.uptime);

    const statusEmbed = {
      title: "Status",
      color: 33679,
      fields: [
        {
          name: "Ping",
          value: args.botClient.ws.ping + 'ms'
        },
        {
          name: "Guilds",
          value: args.botClient.guilds.cache.size
        },
        {
          name: "Uptime",
          value: uptime
        }
      ],
      footer: {
        text: args.prefix + "status",
        icon_url: "https://cdn.discordapp.com/avatars/727895377751179324/0b08ac6228e890159c14734e7b8bb492.png?size=256"
      },
      timestamp: new Date()
    }

    message.channel.send({ embed: statusEmbed });
  }
}