const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Registrar a fonte personalizada
const fontPath = path.join(__dirname, '../assets/fonts/BungeeTint-Regular.ttf');
registerFont(fontPath, { family: 'BungeeTint-Regular' });

// Lista de templates de despedida (URLs ou caminhos locais)
const templates = [
    'https://i.imgur.com/tMczTDp.png',
    'https://i.imgur.com/10LUuzz.png',
    'https://i.imgur.com/A7fpcXX.png',
    'https://i.imgur.com/YIThuxP.png',
    'https://i.imgur.com/b6Y6lpg.png',
    'https://i.imgur.com/HrYR7or.png',
];

/**
 * Gera uma imagem de despedida personalizada com efeito de blur no fundo.
 * @param {string} avatarURL - URL da foto de perfil do usuário.
 * @param {string} displayName - Nome de exibição do usuário.
 * @param {number} memberCount - Número total de membros no servidor.
 * @param {Date} joinedAt - Data em que o usuário entrou no servidor.
 * @returns {Promise<Buffer>} - Buffer da imagem gerada.
 */
async function generateGoodbyeImage(avatarURL, displayName, memberCount, joinedAt) {
    try {
        // Escolher um template aleatório
        const templateURL = templates[Math.floor(Math.random() * templates.length)];

        // Carregar o template de despedida
        const template = await loadImage(templateURL);

        // Criar um canvas com o tamanho do template
        const canvas = createCanvas(template.width, template.height);
        const ctx = canvas.getContext('2d');

        // Aplicar efeito de blur no fundo
        for (let i = 0; i < 15; i++) {
            ctx.globalAlpha = 0.1;
            ctx.drawImage(template, -2, -2, canvas.width + 4, canvas.height + 4);
        }
        ctx.globalAlpha = 1;

        // Carregar a foto de perfil do usuário
        const avatar = await loadImage(avatarURL);

        // Definir tamanho e posição da foto de perfil
        const avatarSize = 150;
        const avatarX = 50;
        const avatarY = (canvas.height - avatarSize) / 2;

        // Criar um círculo para a foto de perfil
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        // Configurar o texto com a fonte personalizada
        ctx.font = 'bold 20px "BungeeTint-Regular"';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';

        // Definir posições do texto
        const goodbyeText = `Até mais, ${displayName}!`;
        const memberText = `Agora somos ${memberCount} membros.`;

        // Calcular dias no servidor
        const now = new Date();
        const daysInServer = Math.floor((now - joinedAt) / (1000 * 60 * 60 * 24)); // Diferença em dias
        const daysText = `Esteve no servidor por ${daysInServer} dias.`;

        const goodbyeTextX = avatarX + avatarSize + 20;
        const goodbyeTextY = avatarY + 40;
        const memberTextY = goodbyeTextY + 50;
        const daysTextY = memberTextY + 50;

        // Desenhar o texto
        ctx.fillText(goodbyeText, goodbyeTextX, goodbyeTextY);
        ctx.fillText(memberText, goodbyeTextX, memberTextY);
        ctx.fillText(daysText, goodbyeTextX, daysTextY);

        // Retornar a imagem como buffer
        return canvas.toBuffer('image/png');
    } catch (error) {
        console.error('Erro ao gerar a imagem de despedida:', error);
        throw error;
    }
}

module.exports = { generateGoodbyeImage };