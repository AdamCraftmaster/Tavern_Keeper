module.exports = {
	name: 'unban',
	category: 'Moderation',
	description: 'Unban a specified user from the server.',
	aliases: [],
	usage: 'unban <user> <reason>',
	run: async (client, message, args) => {
		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `BAN_MEMBERS` required.',
			);
		}

		if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `BAN_MEMBERS` required.',
			);
		}

		const id = args[0];
		const bannedUsers = await message.guild.fetchBans();
		const user = bannedUsers.get(id);
		if (!user) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		const Reason = args.slice(1).join(' ');
		if (!Reason) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a reason.',
			);
		}

		message.guild.members.unban(user.user);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully unbanned **${user.user.username}**#${user.user.discriminator}`,
		).then(message.delete());
	},
};