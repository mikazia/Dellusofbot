const Discord = require('discord.js');
const path = require('path');
const fs = require('fs').promises;
const fetch = require('node-fetch');
const axios = require('axios');
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
async NewChannel(channelName) {
    const channel = this.client.channels.cache.find(channel => channel.name === channelName);
  if (!channel) {
    // Si le canal n'existe pas, on le cr�e
   this.client.guilds.cache.forEach(guild => {
      guild.channels.create(channelName, {
        type: 'text'
      }).then(channel => {
        console.log(`Canal crée : ${channel.name}`);
      }).catch(console.error);
    });
  }
  };
async createRole(name, color, permissions, guildId) {
  try {
    const guild = await this.client.guilds.fetch(guildId);
    const role = await guild.roles.create({
      data: {
        name: name,
        color: color,
        permissions: permissions
      }
    });
    console.log(`Created role ${role.name} with ID ${role.id}.`);
  } catch (error) {
    console.error(`Error creating role: ${error}`);
  }
}
async randomDog(message) {
    try {
      // Appel à l'API "Dog CEO" pour récupérer une image de chien aléatoire
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();

      // Envoie l'image de chien dans le canal Discord
      const dogImage = new Discord.MessageAttachment(data.message);
      message.channel.send(dogImage);
    } catch (error) {
      console.error(error);
      message.channel.send('Désolé, je n\'ai pas pu récupérer d\'image de chien.');
    }
  }
async randomCat(message) {
    try {
      // Appel à l'API "TheCatApi" pour récupérer une image de chat aléatoire
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();

      // Envoie l'image de chat dans le canal Discord
      const catImage = new Discord.MessageAttachment(data[0].url);
      message.channel.send(catImage);
    } catch (error) {console.error(error);
      message.channel.send('Désolé, je n\'ai pas pu récupérer d\'image de chat.');
    }
  }
async randomImg(message) {
    try {
      // Récupérer une image de bébé aléatoire depuis une API
      const response = await axios.get('https://picsum.photos/200/300/?random', { responseType: 'arraybuffer' });

      // Envoyer l'image de bébé au channel Discord qui a envoyé le message
      message.channel.send({
        files: [{
          attachment: response.data,
          name: 'baby.jpg'
        }]
      });
    } catch (error) {
      console.error(error);
      message.channel.send('Désolé, je n\'ai pas réussi à génétrer une image aleatoire,il y a eu un soucis avec Dellusofbot ❗ou votre propre code');
    }
  }
async DeleteRole(message, permsError) {
    try {
      // Check if user has permission to manage roles
      if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.reply(permsError);
      }

      // Get the role mentioned in the message
      const roleName = message.content.split(/[ ]+/)[1];
      const role = message.guild.roles.cache.find(
        (role) => role.name === roleName
      );

      // Check if role exists
      if (!role) {
        return message.reply(`il ny a pas de rôle nommé "${roleName}".`);
      }

      // Delete the role
      await role.delete();
      message.reply(`The role "${roleName}" has been deleted.`);
    } catch (error) {
      console.error(error);
      message.reply('une erreur sest produite lors de la suppression de ce role.');
    }
  }
async cloneChannel(message,MessageCloner ) {
    if (!message.guild || !message.member) {
      // On ignore les messages envoyés en dehors d'un salon Discord ou par un bot
      return
    }

    // Obtenez le canal dans lequel la commande a été exécutée
    const sourceChannel = message.channel

    // Créez un nouveau canal avec des propriétés similaires
    const clonedChannel = await sourceChannel.clone()

    // Déplacez le nouveau canal dans la même catégorie que le canal source
    const sourceCategory = sourceChannel.parent
    if (sourceCategory) {
      const targetCategory = message.guild.channels.cache.find(
        (channel) => channel.type === 'category' && channel.name === sourceCategory.name
      )
      if (targetCategory) {
        await clonedChannel.setParent(targetCategory)
      }
    }

    // Envoyez un message dans le nouveau canal pour notifier qu'il a été cloné
    await clonedChannel.send(MessageCloner)    

    // Remplacez la chaîne d'origine par le nouveau canal cloné
    message.channel = clonedChannel
  }
customJsFunction(message, code) {
    // Vérifie que l'utilisateur dispose des autorisations nécessaires pour exécuter cette fonction
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.reply("Vous n'avez pas la permission d'effectuer cette commande.");
      return;
    }

    try {
      // Exécute le code Discord.js personnalisé
      eval(code);
    } catch (err) {
      // En cas d'erreur, renvoie un message d'erreur
      message.channel.send(`\`\`\`xl\n${err}\n\`\`\``);
    }
  }
async repondreMsg(message, replyText) {
  try {
    // Utilisation de l'API Discord.js pour envoyer une réponse en reply
    message.reply(replyText);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de la réponse: ${error}`);
  }
}
async SendDm(userId, message) {
  const user = await this.client.users.fetch(userId);
  user.send(message);
  }
generateInvite(message) {
    //Check if message is a valid string

    //Create invite link
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=0&scope=bot&message=8`;

    //Return invite link
    return inviteLink;
}
async setSlowmode(message,time,ErrorMessage,sucesMessage) {
    try {
      if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.reply(ErrorMessage);
      }
        const channel = await message.channel;
        // Set the slowmode
        await channel.setRateLimitPerUser(time);
        // Return a success message
        return message.reply(sucesMessage);
    } catch (err) {
        // Return an error message
        return message.reply(`Error setting slowmode: ${err}`);
    }
}
          }
module.exports = Dellubot;