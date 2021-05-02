var num = 0;
module.exports = {
    name: 'ping',
    description: 'Esto es un comando de Ping Pong!',
    execute(message,args,Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FC0303')
        .setTitle('Rules')
        .setAuthor('Alexander Almeida', 'https://i.ytimg.com/vi/P31z2qbErpc/maxresdefault.jpg', 'https://ceibal.schoology.com/apps/191034318/run/course/4742537739')
        .setURL('https://ceibal.schoology.com/apps/191034318/run/course/4742537739')
        .setDescription('An interesting description')
        .setThumbnail('https://i.ytimg.com/vi/P31z2qbErpc/maxresdefault.jpg')
        .addFields(
            {name: 'Rule 1', value: 'Be nice',inline:true},
            {name: 'Rule 2', value: 'follow twitch',inline:true},
            {name : 'Rule 3', value: 'no memes',inline:true}
        )
        .addField('Inline field title','asfggg',true)
        .setImage('https://i.ytimg.com/vi/P31z2qbErpc/maxresdefault.jpg')
        .setTimestamp()
        .setFooter('Make sure to check out the rules channel');
        
        message.channel.send(newEmbed);
    }
}