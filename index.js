require('dotenv').config();

const fs = require('fs');

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Discord = require('discord.js');
const client = new Discord.Client();
const clientCommands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(commandFile => {
  const command = require(`./commands/${commandFile}`);
  clientCommands.set(command.name, command);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  let { data: servers, error } = await supabase
    .from('servers')
    .select("*")
    .eq('id', message.guild.id);

  let prefix = 'mf!';

  if(!servers[0]) {
    const { data, error } = await supabase
      .from('servers')
      .insert([
        { id: message.guild.id, prefix: 'mf!' }
      ]);

      prefix = 'mf!';
  } else {
    prefix = servers[0].prefix;
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!clientCommands.has(command)) return;

  try {
    clientCommands.get(command).execute(message, {
      msgArgs: args,
      prefix: prefix
    });
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.on('guildCreate', async guild => {
  const { data, error } = await supabase
    .from('servers')
    .insert([
      { id: guild.id, prefix: 'mf!' }
    ]);

  console.log('Joined Guild: ' + guild.name);
});

client.on('guildDelete', async guild => {
  const { data, error } = await supabase
    .from('servers')
    .delete()
    .eq('id', guild.id);

  console.log('Left Guild: ' + guild.name);
});

client.login(process.env.DISCORD_TOKEN);