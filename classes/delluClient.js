const fs = require('fs')
const delluError = require('../classes/delluError.js')
const BaseClient = require('../handler/base.js')
const {FunctionManager} = require('../handler/Functions.js')
const {CommandManager,Command} = require('../handler/Commands.js')
const Collection = require('../CacheHandler/index.js').cache 
const delluToken = require('../classes/delluToken.js')
const delluPrefix = require('../classes/delluPrefix.js')
const Discord = require('discord.js');

function Dellubot(JETON) {
    const bot = new Discord.Client();
    bot.login(JETON);
    return bot;
}

module.exports = Dellubot;