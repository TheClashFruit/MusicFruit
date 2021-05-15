module.exports = {
  name: 'now',
  description: 'Now Command.',
  async execute(message, args) {
    let { data: servers, error } = await args.db
      .from('servers')
      .select("*")
      .eq('id', message.guild.id);

    message.channel.send('Now plying: `' + servers[0].nowPlayingData.videoDetails.title + '`');
  }
}