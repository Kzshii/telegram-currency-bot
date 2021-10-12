const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const token = process.env.BOT_TOKEN;
const helpers = require('./helpers.js')

const { convertCurrencyCode } = helpers;

const api = "https://economia.awesomeapi.com.br"

let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new TelegramBot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/(([a-zA-Z]*)(?=-?([a-zA-Z]*)))/, async (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Pesquisando...');

  const [_, match1, __, match2] = match;
  const url = `${api}/${match1}${match2 ? `-${match2}` : '-BRL'}`;
  const res = await fetch(url);

  if (!res.ok) {
    bot.sendMessage(chatId, 'Something went wrong\nTry again soon');
    return;
  }

  const [data] = await res.json();
  const { name, ask, codein } = data;
  const currencySymbol = convertCurrencyCode(codein);

  bot.sendMessage(
    chatId,
    `Moeda: ${name}\nValor: ${currencySymbol}${Number(ask).toFixed(2)}`
  );
});

module.exports = bot;