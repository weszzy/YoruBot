const { AttachmentBuilder } = require('discord.js');
const { generateGoodbyeImage } = require('../services/goodbyeImageService');
const config = require('../config.json');

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
            const buffer = await generateGoodbyeImage(avatarURL, displayName, memberCount);

            // Criar um anexo com a imagem gerada
            const attachment = new AttachmentBuilder(buffer, { name: 'goodbye.png' });

            // Criar a mensagem de despedida
            const goodbyeMessage = `Até mais, ${member.toString()}! Sentiremos sua falta.`;

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