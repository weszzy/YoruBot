const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Registra a fonte personalizada
const fontPath = path.join(__dirname, '../assets/fonts/BungeeTint-Regular.ttf');
registerFont(fontPath, { family: 'BungeeTint-Regular' });

// Lista de templates de boas-vindas
const templates = [
    'https://i.imgur.com/VfhNShg.png',
    'https://i.imgur.com/NsHJ45A.png',
    'https://i.imgur.com/t0NVQr9.png',
    'https://i.imgur.com/2DyVS1D.png',
    'https://i.imgur.com/o3hWEjx.png',
    'https://i.imgur.com/xQYArZh.png',
];

/**
 * Gera uma imagem de boas-vindas personalizada.
 * @param {string} avatarURL - URL do avatar do usuário.
 * @param {string} displayName - Nome de exibição do usuário.
 * @param {number} memberCount - Número de membros no servidor.
 * @returns {Promise<Buffer>} - Buffer da imagem gerada.
 */
async function generateWelcomeImage(avatarURL, displayName, memberCount) {
    try {
        // Escolhe um template aleatório
        const templateURL = templates[Math.floor(Math.random() * templates.length)];

        // Carrega o template
        const template = await loadImage(templateURL);

        // Cria o canvas
        const canvas = createCanvas(template.width, template.height);
        const ctx = canvas.getContext('2d');

        // Aplica efeito de blur no fundo
        for (let i = 0; i < 15; i++) {
            ctx.globalAlpha = 0.1;
            ctx.drawImage(template, -2, -2, canvas.width + 4, canvas.height + 4);
        }
        ctx.globalAlpha = 1;

        // Carrega o avatar do usuário
        const avatar = await loadImage(avatarURL);

        // Define tamanho e posição do avatar
        const avatarSize = 150;
        const avatarX = 50;
        const avatarY = (canvas.height - avatarSize) / 2;

        // Desenha o avatar em um círculo
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        // Configura o texto
        ctx.font = 'bold 20px "BungeeTint-Regular"';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';

        // Define posições do texto
        const welcomeText = `Bem-vindo(a), ${displayName}!`;
        const memberText = `Membro #${memberCount}`;
        const welcomeTextX = avatarX + avatarSize + 20;
        const welcomeTextY = avatarY + 40;
        const memberTextY = welcomeTextY + 50;

        // Desenha o texto
        ctx.fillText(welcomeText, welcomeTextX, welcomeTextY);
        ctx.fillText(memberText, welcomeTextX, memberTextY);

        // Retorna a imagem como buffer
        return canvas.toBuffer('image/png');
    } catch (error) {
        console.error('Erro ao gerar a imagem de boas-vindas:', error);
        throw error;
    }
}

module.exports = { generateWelcomeImage };