const { AttachmentBuilder } = require('discord.js');
const { generateWelcomeImage } = require('../services/welcomeImageService');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd', // Nome do evento
    async execute(member) {
        const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);

        if (!welcomeChannel) {
            console.error('Canal de boas-vindas não encontrado. Verifique o ID no config.json.');
            return;
        }

        try {
            // Gerar a imagem de boas-vindas
            const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
            const displayName = member.displayName;
            const memberCount = member.guild.memberCount;
            const buffer = await generateWelcomeImage(avatarURL, displayName, memberCount);

            // Criar um anexo com a imagem gerada
            const attachment = new AttachmentBuilder(buffer, { name: 'welcome.png' });

            // Criar a mensagem de boas-vindas
            const welcomeMessage = `Olá, ${member.toString()}! Bem-vindo(a) ao servidor! Esperamos que você se divirta aqui.`;

            // Enviar a mensagem com a imagem
            await welcomeChannel.send({
                content: welcomeMessage,
                files: [attachment],
            });
        } catch (error) {
            console.error('Erro ao processar a imagem de boas-vindas:', error);
        }
    },
};