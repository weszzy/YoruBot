const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});


// Carrega os eventos
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Inicia o bot
client.login(config.token)
    .then(() => console.log('Bot está online!'))
    .catch(error => console.error('Erro ao iniciar o bot:', error));