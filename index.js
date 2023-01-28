const discord = require("discord.js")


const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: 3276799 });

const config = require("./ayarlar.json")

client.login(config.token);

client.on("ready",() => {
    console.log(`${client.user.tag} hazır!`)
    client.user.setPresence({ activities: [{ name: 'Swanex ❤️' }], status: 'idle' });
})


const prefix = config.prefix
const owner = config.owner

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, StringSelectMenuBuilder, ModalBuilder } = require('discord.js');

client.on("messageCreate", async message => {
if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
let args = message.content.split(' ').slice(1);
let command = message.content.split(' ')[0].slice(prefix.length);
if(command === "safe"){ // komutlar bu şekilde eklenecektir. if(command === "komut")
 message.channel.send("güvenli")
    }
 if(command === "eval"){
        if (message.author.id !== owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${owner}>`});;
    if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi`});
    let code = args.join(' ');
    function clean(text) {
    if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
    text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
    return text;
  };
  let res;
  try {
    res = eval(clean(code));
    if (typeof res !== 'string') res = require('node:util').inspect(res);
  }  catch(err) { 
    console.error(err.stack);
    res = err.message;
     } 
     message.channel.send(res, {code: "js", split: true});
    } // buraya if eklenip komut eklenebilir
    if(command === "aeval"){
        //if (message.author.id !== config.owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${config.owner}>`});
      if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi`});
      let code = args.join(' ');
      function clean(text) {
          if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
          else return text;
      }
      
      try {
  
          let evaled = eval("(async () => {" + code + "})()");
      
          if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
      
           message.channel.send(clean(evaled), { code: "xl" });
          
      } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      }
      }
      if(command === "intent"){
        //
const row = new ActionRowBuilder()
.addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('inter')
        .setPlaceholder('seçim yapılmadı')
        .setMinValues(1)
        .setMaxValues(19)
        .addOptions([
            {
                label: 'Guilds',
                description: 'Sunucular',
                value: 'Guilds',
            },
            {
                label: 'Guild Members',
                description: 'Sunucudaki Üyeler',
                value: 'guild_members',
            },
            {
                label:"Guild Bans",
                description:"Sunucudaki banlamalar",
                value:"Guild_Bans",
            },
            {
                label:"Guild Emojis And Stickers",
                description:"GuildEmojisAndStickers",
                value:"guild_emojis_and_stickers",
            },
            {
                label:"Guild Integrations",
                description:"GuildIntegrations",
                value:"guild_integrations",
            },
            {
                label:"Guild Webhooks",
                description:"GuildWebhooks",
                value:"guild_webhooks",
            },
            {
                label:"Guild Invites",
                description:"GuildInvites",
                value:"guild_invites",
            },
            {
                label:"Guild Voice States",
                description:"GuildVoiceStates",
                value:"guild_voice_states",
            },
            {
                label:"Guild Presences",
                description:"GuildPresences",
                value:"guild_presences",
            },
            {
                label:"Guild Messages",
                description:"GuildMessages",
                value:"guild_messages",
            },
            {
                label:"Guild Message Reactions",
                description:"GuildMessageReactions",
                value:"guild_message_reactions",
            },
            {
                label:"Guild Message Typing",
                description:"GuildMessageTyping",
                value:"guild_message_typing",
            },
            {
                label:"Direct Messages",
                description:"DirectMessages",
                value:"direct_messages",
            },
            {
                label:"Direct Message Reactions",
                description:"DirectMessageReactions",
                value:"direct_message_reactions",
            },
            {
                label:"Direct Message Typing",
                description:"DirectMessageTyping",
                value:"direct_message_typing",
            },
            {
                label:"Message Content",
                description:"MessageContent",
                value:"message_content",
            },
            {
                label:"Guild Scheduled Events",
                description:"GuildScheduledEvents",
                value:"guild_scheduled_events",
            },
            {
                label:"Auto Moderation Configuration",
                description:"AutoModerationConfiguration",
                value:"auto_moderation_configuration",
            },
            {
                label:"Auto Moderation Execution",
                description:"AutoModerationExecution",
                value:"auto_moderation_execution",
            },
        ]),
);


message.channel.send({content:`İntent'te olmasını istediğiniz özellikleri seçin`, components: [row]})
      }
 return;
});



client.on('interactionCreate', async (interaction) => {
    const code = {
      GUILDS: 1 << 0,
      GUILD_MEMBERS: 1 << 1,
      GUILD_BANS: 1 << 2,
      GUILD_EMOJIS_AND_STICKERS: 1 << 3,
      GUILD_INTEGRATIONS: 1 << 4,
      GUILD_WEBHOOKS: 1 << 5,
      GUILD_INVITES: 1 << 6,
      GUILD_VOICE_STATES: 1 << 7,
      GUILD_PRESENCES: 1 << 8,
      GUILD_MESSAGES: 1 << 9,
      GUILD_MESSAGE_REACTIONS: 1 << 10,
      GUILD_MESSAGE_TYPING: 1 << 11,
      DIRECT_MESSAGES: 1 << 12,
      DIRECT_MESSAGE_REACTIONS: 1 << 13,
      DIRECT_MESSAGE_TYPING: 1 << 14,
      MESSAGE_CONTENT: 1 << 15,
      GUILD_SCHEDULED_EVENTS: 1 << 16,
      AUTO_MODERATION_CONFIGURATION: 1 << 20,
      AUTO_MODERATION_EXECUTION: 1 << 21
  };
  
      var inputs = interaction.values
      var value = 0;
      inputs.forEach(a => {
              value += code[a.toUpperCase()];
      });
      //console.log(value);
  interaction.reply(`intents: ${value}`)
  
  })