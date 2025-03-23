<div align="center">

<img height="180" alt="YoruBot's logo" src="https://i.imgur.com/TZXlOjn.jpeg">

# YoruBot 

[![wakatime](https://wakatime.com/badge/user/bdeb95f3-d0ba-450e-bb85-f5c3aa2006a7/project/65f4e101-757c-4d62-bbfb-d5930c79d868.svg)](https://wakatime.com/)

[![My Skills](https://skillicons.dev/icons?i=js,nodejs&theme=light)](https://skillicons.dev)
</div>

<br>

<div align="center">

Bot de Boas-Vindas e Despedida para Discord

Um bot simples e eficiente que dá as boas-vindas a novos membros e se despede de quem sai. 
Utiliza mensagens personalizadas & imagens customizadas.

</div>




## O que faz?

### **Boas-Vindas Personalizadas**: 
- Mensagens aleatórias predefinidas de boas-vindas.
- Imagens customizadas com nome do usuário e número de membros no servidor.

### **Despedidas**: 
- Mensagens aleatórias predefinidas de despedida.
- Imagens personalizadas com nome do usuário, número de membros restantes e tempo que o usuário esteve no servidor.


## Como usar
#### Requisitos
- Node.js 16.x ou superior.
- Um bot do Discord criado no Discord Developer Portal.
- Permissões adequadas no servidor (ver seção de permissões abaixo).

#### Clone o Repositório:

```
git clone https://github.com/weszzy/YoruBot
cd YoruBot
```
#### Instale as Dependências:
```
npm install
```

#### Configure o Bot:

**Crie um arquivo config.json na raiz do projeto com o seguinte conteúdo**:

```
{
  "token": "SEU_TOKEN_DO_BOT_AQUI",
  "welcomeChannelId": "ID_CANAL_BOASVINDAS_AQUI",
  "goodbyeChannelId": "ID_CANAL_DESPEDIDA_AQUI",
}
```

## Permissões Necessárias
#### Para o bot funcionar sem problemas, ele precisa das seguintes permissões:

- Ver Canais (View Channels)

- Enviar Mensagens (Send Messages)

- Anexar Arquivos (Attach Files)

- Gerenciar Mensagens (Manage Messages)

## 📝 Licença

 
Licenciado sob a **[Licença MIT](https://github.com/weszzy/YoruBot/blob/main/LICENSE)**. 


#### Sinta-se livre para usar e modificar conforme necessário ❤️