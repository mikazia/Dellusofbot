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
write(channel) {
    channel.startTyping();
    setTimeout(() => {
      channel.stopTyping();
    }, 20000); // Stoppe l'�criture apr�s 20 secondes
  }
BotCreationAnnée() {
    const creationDate = this.client.user.createdAt;
    return creationDate.getFullYear();
  }
async afficherListeEmojis(message) {
    const guild = message.guild;
    const emojis = guild.emojis.cache.array();

    const embed = {
      color: Math.floor(Math.random() * 16777215), // Couleur random
      title: `Liste des emojis de ${guild.name}`,
      description: emojis.join(' '),
    };

    await message.channel.send({ embed });
  }
MentionUser(message) {
    const user = message.mentions.users.first();
    if (user) {
      return user;
    } else {
      return null;
    }
  }
BotServerList(channel) {
    let serverList = "";
    this.client.guilds.cache.forEach((guild) => {
      serverList += `${guild.name} (${guild.id})\n`;
    });

    channel.send(serverList);
  }
async BotLeaveByID(serverID, userID) {
    // V�rifier si l'utilisateur est autoris� � utiliser cette fonction
    if (userID !== userID) {
      throw new Error('la personne qui a utiliser cette commande sur le serveur nest pas autorisé a l/excutée❗');
    }

    // R�cup�rer l'objet du serveur par son ID
    const server = this.client.guilds.cache.get(serverID);

    // V�rifier si le bot est pr�sent sur ce serveur
    if (!server) {
      throw new Error('Le bot n\'est pas present sur ce serveur.');
    }

    // Faire quitter le bot du serveur
    await server.leave();
  }
async createTempVoc(message, channelName) {
    // R�cup�rer la cat�gorie parente
    const parentCategory = message.channel.parent;

    // Cr�er le salon vocal temporaire
    const createdChannel = await message.guild.channels.create(channelName, {
      type: 'voice',
      parent: parentCategory,
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
        },
        {
          id: message.author.id,
          allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
        },
      ],
    });

    // D�placer l'utilisateur dans le salon vocal temporaire
    await message.member.voice.setChannel(createdChannel);
}
async ServerCreateInvit(message) {
    try {
      const invite = await message.channel.createInvite({ maxAge: 86400, maxUses: 1 });
      message.channel.send(`Voici le lien pour rejoindre le serveur : ${invite.url}`);
    } catch (error) {
      console.error(`Impossible de créer une invitation : ${error}`);
      message.channel.send(`Désolé, une erreur est survenue lors de la création de l'invitation.`);
    }
  }
async MessageEdit(channel, time, message, newText) {
    // Envoi du message initial
    const sentMessage = await channel.send(message);
    
    // Attendre le temps sp�cifi�
    await new Promise(resolve => setTimeout(resolve, time));
    
    // Editer le message avec le nouveau texte
     sentMessage.edit(newText);
  }
NicknameChange(message) {
  const member = message.mentions.members.first();
  const newNickname = message.content.split(' ').slice(2).join(' '); // R�cup�re le nouveau pseudo � partir du message
  member.setNickname(newNickname); // Modifie le pseudo du membre mentionn�
  message.channel.send(`${member.displayName}'s a ete change pour ${newNickname}.`); // Envoi une confirmation dans le canal de discussion
}
}
module.exports = Dellubot;