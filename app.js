require("dotenv").config();
const Discord = require("discord.js");
const openai = require("openai");

const config = new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const gpt3 = new openai.OpenAIApi(config);

const Client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent]
});

Client.on("ready", () => {
    console.log(`Logged in as ${Client.user.tag}`);
});

Client.on("messageCreate", async (message) => {
    if(message.content === "! Yo GPT") {
        message.reply("Hey there! Do you need any help?");
    }
    else if(message.content.startsWith("!")) {
        const response = await gpt3.createCompletion({
            model: "text-davinci-003",
            prompt: message.content.replace("$", ""),
            temperature: 0.7,
            max_tokens: 400,
        });

        const text = response.data.choices[0].text;
        
        message.reply(text);
    }
});

Client.login(process.env.CLIENT_ID);
