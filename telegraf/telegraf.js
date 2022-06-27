require('dotenv').config();
const sleep = require('../utils/sleep');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

async function sendMessage(arrayData) {
    for await (let data of arrayData) {
        console.log(data);
        await sleep(1000).then(() => {
            bot.telegram.sendMessage(process.env.BOT_CHAT_ID, data);
        });
    }
}

module.exports = sendMessage;
