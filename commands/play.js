module.exports = {
  name: 'play',
  description: 'Play Command.',
  async execute(message, args) {
    const ytdl = require('ytdl-core');

    if (!message.member.voice.channel) {
      message.reply('Join a Voice Channel first.');
      return;
    }

    const vcConnection = await message.member.voice.channel.join();
    const vcID = message.member.voice.channelID;

    const { data, error } = await args.db
      .from('servers')
      .update({ channel: vcID })
      .eq('id', message.guild.id);

    let dispatcher = await vcConnection.play(ytdl(args.msgArgs[0]), { volume: 0.5 });

    dispatcher.on('start', () => {
      ytdl.getInfo(args.msgArgs[0])
        .then(async info => {
          message.channel.send('Playing `' + info.videoDetails.title + '`.');

          const { data, error } = await args.db
            .from('servers')
            .update({ nowPlayingData: info })
            .eq('id', message.guild.id);
        });
    });

    dispatcher.on('finish', async () => {
      const { data, error } = await args.db
        .from('servers')
        .update({ nowPlayingData: null })
        .eq('id', message.guild.id);
    });

    module.exports.dispatcher = dispatcher;
  }
}