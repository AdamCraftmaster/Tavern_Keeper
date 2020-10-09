/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'dog',
	category: 'Animals',
	description: 'See some cute doggos!',
	aliases: ['dogs', 'doggo', 'puppy', 'puppies'],
	usage: 'dog',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/animals/dog';

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setImage(response.image);
		message.channel.send(embed);
	},
};