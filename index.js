const Discord = require('discord.js');
const path = require('path');
const fs = require('fs').promises;

class Dellubot {
  constructor() {
    this.client = new Discord.Client();
    let token;
    this.token = token;
this.rootDir = process.cwd();
    this.commandsDir = path.resolve(this.rootDir, 'commands');
    this.initialize();
  }
  setActivity(status, type, text) {
  const validStatuses = ['online', 'offline', 'idle', 'dnd'];
  const isValidStatus = validStatuses.includes(status);
  if (!isValidStatus) {
    console.log(`Invalid status ${status}. Must be one of ${validStatuses.join(', ')}`);
    return;
  }
    const validActivityTypes = ['PLAYING', 'WATCHING', 'LISTENING', 'STREAMING', 'CUSTOM_STATUS'];
  const isValidActivityType = validActivityTypes.includes(type);
  if (!isValidActivityType) {
    console.log(`Invalid activity type ${type}. Must be one of ${validActivityTypes.join(', ')}`);
    return;
  }

  if (type === 'CUSTOM_STATUS' && text.trim().length === 0) {
    console.log('Custom status text cannot be empty');
    return;
  }

  this.client.on('ready', () => {
    const activity = type === 'CUSTOM_STATUS' ? { name: text } : { type: type, name: text };
    this.client.user.setPresence({
      status: status,
      activity: activity,
    });
    console.log(`Set status to ${status} and activity to ${type} ${text}`);
  });
  }
BotSendMsg(channel, message) {
    channel.send(message);
  }
  
  // Méthode pour gérer les messages
  handleMessages(callback) {
    this.bot.on('message', message => {
      callback(message);
    });
  }
  CommandsStart(trigger, commands) {
    this.client.on('message', message => {
      if (!message.content.startsWith(trigger)) return;
      const commandBody = message.content.slice(trigger.length);
      const args = commandBody.split(' ');
      const command = args.shift().toLowerCase();
      if (commands[command]) {
        commands[command](message);
      }
    });
  }
botToken(token) {
    this.token = token;
    this.client
      .login(this.token)
      .then(() => console.log('Bot connected'))
      .catch(error => console.log(error));
  }
  initialize() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}`);
    });
  }
  botPrefix(prefix) {
    this.prefix = prefix;
  }
  botMess() {
    this.client.on('message', message => {
      // Vérifie si le message commence par le préfixe défini
      if (!message.content.startsWith(this.prefix) || message.author.bot) return;

      const args = message.content.slice(this.prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      const commandHandler = require(path.join(this.commandsDir, `${command}.js`));
      commandHandler.execute(message, args);
    });
  }
  async
createCommandHandler(commandName) {
    // Vérifie si le répertoire des commandes existe, sinon le crée
    try {
  fs.access(this.commandsDir);
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.mkdir(this.commandsDir);
        console.log(`Created commands directory at ${this.commandsDir}`);
      } else {
        throw error;
      }
    }
}
    createCommandHandler(commandName) {
    // Vérifie si le répertoire des commandes existe, sinon le crée
    try {
      fs.access(this.commandsDir);
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.mkdir(this.commandsDir);
        console.log(`Created commands directory at ${this.commandsDir}`);
      } else {
        throw error;
      }
    }
      const commandHandlerPath = path.join(this.commandsDir, `${commandName}.js`);
    const commandHandlerCode = `module.exports = {
  name: '${commandName}',
  description: 'Description de la commande ${commandName}',
execute(message, args) {
  },
};`;
fs.writeFile(commandHandlerPath, commandHandlerCode, 'utf-8');
    console.log(`Created command handler for ${commandName} at ${commandHandlerPath}`);
  }
  BotWs() {
    this.latency = Date.now() - this.client.ws.ping
    return this.latency;
  }
createEmbed(title, description, color, image) {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description);
    if (image) {
      embed.setImage(image);
    }
    return embed;
  }
MultiAct(activities, time) {
    setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      this.client.user.setActivity(activity);
    }, time);
  }
NbCmd() {
    return this.commands.length;
  }

  // Ajoute une fonction pour ajouter une commande
  addCounterCmd(command) {
  if (Array.isArray(this.commands)) {
    this.commands.push(command);
  } else {
    this.commands = [command];
  }
  }
countServers() {
    const numServers = this.client.guilds.cache.size; // obtenir le nombre de serveurs
    console.log(`Le bot est pr�sent sur ${numServers} serveurs.`); // afficher le nombre de serveurs dans la console
  }
randomMess(messages) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    }
BotSay(message) {
  const args = message.content.slice(5).trim();
  // Envoyer le message dans le m�me canal
  message.channel.send(args);
}
YourAvatar(message) {
    return message.author.avatarURL();
  }
async BotPp(channel) {
    // R�cup�rer l'URL de la photo de profil du bot
    const botAvatarUrl = await this.client.user.displayAvatarURL();

    // Envoyer un message avec la photo de profil du bot dans le channel
    await channel.send({
      files: [botAvatarUrl],
      embed: {
        image: {
          url: botAvatarUrl,
        },
      },
    });
}
async serveurMembres(message) {
    const guild = message.guild;
    if (!guild) {
      message.reply("Impossible d'obtenir le serveur.");
      return;
    }
    const fetchResult = await guild.members.fetch();
    const nbMembres = fetchResult.size;
    message.reply(`Le serveur contient ${nbMembres} membres.`);
  }
async getBotOwner() {
    const application = await this.client.fetchApplication();
    const owner = await this.client.users.fetch(application.owner.id);
    return `${owner.username}#${owner.discriminator}`;
  }
async ajouterReactions(message, reactions) {
  try {
    for (let reaction of reactions) {
      await message.react(reaction);
    }
  } catch (error) {
    console.error(`Erreur lors de l'ajout des r�actions : ${error}`);
  }
      }
}
module.exports = Dellubot;