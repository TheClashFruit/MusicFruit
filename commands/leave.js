module.exports = {
  name: 'join',
  description: 'Join Command.',
  async execute(message, args) {
    if (!message.member.voice.channel) {
      message.reply('Join a Voice Channel first.');
      return;
    }

    let { data: servers, error } = await args.db
      .from('servers')
      .select("*")
      .eq('id', message.guild.id);

    if (vcID == servers[0].channel) {
      message.reply('You are not in the same voice channel as the bot.');
      return;
    }

    const { data, error } = await args.db
      .from('servers')
      .update({ channel: null })
      .eq('id', message.guild.id);

    message.member.voice.channel.leave();
  }
}