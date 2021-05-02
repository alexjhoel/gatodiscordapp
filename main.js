const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));

var commandsNames = [];

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

    commandsNames.push(command.name);
}
console.log(commandsNames);
var num = 0;
client.once('ready',() => {
    console.log('My bot is online!!!!!!');
})

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(commandsNames.includes(command)){
        client.commands.get(command).execute(msg,args,Discord);
    }
    
    
  });



client.login('ODM0OTc5NjM0MDc2MTg4NzEz.YIIxYQ.JKIVHjEbsm52aHsE1EY2VhscDqM');