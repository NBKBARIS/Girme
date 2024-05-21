require('dotenv').config(); // dotenv modülünü kullanarak .env dosyasındaki değişkenleri yükle

const colors = require('colors');
const title = require('./modules/title.js');
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
title('Hosgeldiniz');

require("./loader.js")(client);

client.on('ready', () => {
    console.log(`${client.user.tag} Olarak Giris Yaptiniz!`.green);
    client.user.setPresence({ activities: [{ name: 'Cesur Bomber', type: 0 }], status: 'idle' });
});

client.login(process.env.DISCORD_TOKEN).catch(() => console.log('Tokeni Kontrol Ediniz'.red));

// Sunucu oluşturma ve proje aktivitesi sağlama.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Web sunucu
app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.`);
});
