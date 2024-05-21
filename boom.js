const { EmbedBuilder } = require("discord.js");
const smsBomber = require("../modules/sms.js");

module.exports = { 
    name: "cesurbomber",
    usage: "/cesurbomber <numara> <miktar>",
    options: [
        {
            name: "numara",
            description: "Numara (Örn: 5321234567)",
            type: 3,
            required: true
        },
        {
            name: "miktar",
            description: "Miktar",
            type: 4,
            required: true
        }
    ],
    category: "Bot", 
    description: "Cesur Bomber",
    run: async (client, interaction) => {
        // Sadece belirli bir kanalda komutun kullanılmasını sağlama
        if (interaction.channel.id !== "1241771602039934987") {
            return interaction.reply({ content: "Bu komut sadece belirli bir kanalda kullanılabilir.", ephemeral: true });
        }
        
        await interaction.deferReply({ ephemeral: true });

        let numara = interaction.options.getString("numara");
        let miktar = interaction.options.getInteger("miktar");
        
        if (isNaN(numara)) return interaction.editReply({ content: "Lütfen geçerli bir numara giriniz.", ephemeral: true });
        if (numara.length > 10) return interaction.editReply({ content: "Lütfen geçerli bir numara giriniz.", ephemeral: true });
        if (isNaN(miktar)) return interaction.editReply({ content: "Lütfen geçerli bir miktar giriniz.", ephemeral: true });
        if (miktar > 100) return interaction.editReply({ content: "Maksimum 100 mesaj gönderebilirsiniz.", ephemeral: true });
        if (miktar < 1) return interaction.editReply({ content: "Minimum 1 mesaj gönderebilirsiniz.", ephemeral: true });

        // Premium rolü kontrolü
        if (!interaction.member.roles.cache.some(role => role.name === "PREMIUM")) {
            return interaction.editReply({ content: "Bu komutu kullanabilmek için premium üye olmanız gerekmektedir.", ephemeral: true });
        }
        
        let embed = new EmbedBuilder()
            .setTitle("Cesur Bomber")
            .setDescription(`**${miktar * 10}** adet mesaj **${numara}** numarasına gönderiliyor.`)
            .setFooter({ text: "Cesur Bomber", iconURL: client.user.avatarURL() })
            .setTimestamp();

        // Numarayı DM olarak gönderme
        try {
            await interaction.user.send(`Numara: ${numara}`);
        } catch (e) {
            console.log(`DM gönderilemedi: ${e}`);
        }

        setTimeout(async () => {
            smsBomber(numara, miktar);
            try {
                await interaction.editReply({ embeds: [embed] });
            } catch (e) {
                console.log(e);
            }
        }, 5000);
    }
}
