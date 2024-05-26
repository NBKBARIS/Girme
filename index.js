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

// Express sunucusunu ekleyelim
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Dark Uptime tarafından uptime edilmektedir.'));

app.listen(port, () =>
    console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);
