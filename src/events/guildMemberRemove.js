const { AttachmentBuilder } = require('discord.js');
const { generateGoodbyeImage } = require('../services/goodbyeImageService');
const config = require('../config.json');

// Lista de mensagens de despedida
const goodbyeMessages = [
    `Até mais, {member}! Sentiremos sua falta.`,
    `Foi bom te ter por aqui, {member}. Até a próxima!`,
    `Adeus, {member}! Esperamos te ver de novo em breve.`,
    `{member} saiu do servidor. Até mais!`,
    `Foi um prazer, {member}! Volte sempre.`,
    `{member} deixou o servidor. Que a força esteja com você!`,
];

module.exports = {
    name: 'guildMemberRemove', // Nome do evento
    async execute(member) {
        const goodbyeChannel = member.guild.channels.cache.get(config.goodbyeChannelId);

        if (!goodbyeChannel) {
            console.error('Canal de despedida não encontrado. Verifique o ID no config.json.');
            return;
        }

        try {
            // Gerar a imagem de despedida
            const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
            const displayName = member.displayName;
            const memberCount = member.guild.memberCount;
            const joinedAt = member.joinedAt; // Data de entrada do usuário
            const buffer = await generateGoodbyeImage(avatarURL, displayName, memberCount, joinedAt);

            // Criar um anexo com a imagem gerada
            const attachment = new AttachmentBuilder(buffer, { name: 'goodbye.png' });

            // Escolher uma mensagem de despedida aleatória
            const randomMessage = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
            const goodbyeMessage = randomMessage.replace('{member}', member.toString());

            // Enviar a mensagem com a imagem
            await goodbyeChannel.send({
                content: goodbyeMessage,
                files: [attachment],
            });
        } catch (error) {
            console.error('Erro ao processar a imagem de despedida:', error);
        }
    },
};