const dotenv = require('dotenv'); 
dotenv.config(); 

const colors = require('colors');
const title = require('./modules/title.js');
const { Client } = require('discord.js');
const client = new Client({ intents: 32767 });
title('Hosgeldiniz');

require("./loader.js")(client);

client.on('ready', () => {
    console.log(`${client.user.tag} Olarak Giriş Yapıldı!`.green);
    client.user.setPresence({ activities: [{ name: 'Cesur Bomber', type: 0 }], status: 'idle' });
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı bağlantı noktasında çalışıyor.`);
});

// Heroku için gerekli değişiklikler
if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN).catch(() => console.log('Tokeni Kontrol Ediniz'.red));
} else {
    console.log("DISCORD_TOKEN ortam değişkeni bulunamadı. Lütfen Heroku ayarlarınızı kontrol edin.");
}
