module.exports = {
  name: 'join',
  description: 'Join Command.',
  async execute(message, args) {
    if (!message.member.voice.channel) {
      message.reply('Join a Voice Channel first.');
      return;
    }

    const vcID = message.member.voice.channelID;

    let { data: servers, errorSelect } = await args.db
      .from('servers')
      .select("*")
      .eq('id', message.guild.id);

    if (vcID == servers[0].channel) {
      message.reply('The bot is already in a voice channel.');
      return;
    }

    const vcConnection = await message.member.voice.channel.join();

    const { data, error } = await args.db
      .from('servers')
      .update({ channel: vcID })
      .eq('id', message.guild.id);
  }
}