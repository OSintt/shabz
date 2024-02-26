const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, success, hershell } = require("../lib/utils");
const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_KEY,
});

module.exports = {
  name: "ask",
  description: "asd",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
      if (message.author.id !== hershell) return error(message, "Hey! >:c");
      const ask = args.slice(0).join(" ");
      if (!ask) return error(message, "Missing Arguments!");

      const messages = [
        { role: "jeremy", content: "es un negro pendejo" },
        {
          role: "shabz",
          content:
            "shabz es un servidor creado por 4 negros squaderos hackers que se odiaban mutuamente y",
        },
      ];

      const res = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `hola`,
        max_tokens: 2048,
      });

      const resL = res.choices[0].text.length;
      const resT = res.choices[0].text;
      if (resL > 200) {
        resL = resT.trim().slice(0, 199) + "...";
      }

      console.log(resL);
      return success(message, `${resT}`);
    } catch (e) {
      return error(message, e.message);
    }
  },
};
