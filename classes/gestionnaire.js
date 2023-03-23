const Discord = require('discord.js');
const client = new Discord.Client();
function gestionnaire(BotPrefix) {
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(BotPrefix) || message.author.bot) return;

	const args = message.content.slice(BotPrefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('❌ il y a eut une erreur lorsque la commande dellusofbot sest excuter❌');
	}
});  
}
  module.exports = gestionnaire;