require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ disableMentions: 'everyone' });
const keepAlive = require('./server');

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

keepAlive();
client.login(process.env.BOT_TOKEN);
