module.exports = {
  name: 'settings',
  description: 'Settings Command.',
  async execute(message, args) {
    if(args.msgArgs[0] == 'prefix') {
      if (!message.member.hasPermission('MANAGE_GUILD')) return;

      const { data, error } = await args.db
        .from('servers')
        .update({ prefix: args.msgArgs[1] })
        .eq('id', message.guild.id);

      message.reply('Prefix set to `' + args.msgArgs[1] + '`');
    } else {
      message.reply('Error.');
    }
  }
}