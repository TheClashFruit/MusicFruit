module.exports = {
  name: 'now',
  description: 'Now Command.',
  async execute(message, args) {
    let { data: servers, error } = await args.db
      .from('servers')
      .select("*")
      .eq('id', message.guild.id);

    if (!servers[0].nowPlayingData) {
      message.reply('Nothing is playing.');
      return;
    }

    message.channel.send('Now plying: `' + servers[0].nowPlayingData.videoDetails.title + '`');
  }
}