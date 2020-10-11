const prefix = process.env.BOT_PREFIX;

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
    message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  if (!message.guild.me.hasPermission('EMBED_LINKS')) {
    return message.channel.send(
      '<:vError:725270799124004934> I must have the following permissions to use that: Embed Links.',
    );
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    command.run(client, message, args);
  }
};