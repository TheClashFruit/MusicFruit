module.exports = {
  name: 'pause',
  description: 'Pause Command.',
  async execute(message, args) {
    let { dispatcher } = require('./play');

    let { data: servers, error } = await args.db
      .from('servers')
      .select("*")
      .eq('id', message.guild.id);

    console.log(servers[0])

    if(servers[0].isPaused) {
      dispatcher.resume();

      const { data, error } = await args.db
        .from('servers')
        .update({ isPaused: false })
        .eq('id', message.guild.id);

      message.channel.send('Resumed.');
    } else {
      dispatcher.pause();

      const { data, error } = await args.db
        .from('servers')
        .update({ isPaused: true })
        .eq('id', message.guild.id);

      message.channel.send('Paused.');
    }
  }
}