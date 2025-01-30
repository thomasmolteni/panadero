const { Client, IntentsBitField, ActivityType, PresenceUpdateStatus, EmbedBuilder, Collection, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionResponse, InteractionType, MessageFlags } = require("discord.js");
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildIntegrations, IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildVoiceStates] });

// ready

client.on("ready", () => {

    client.user.setActivity("Pandesal Community App", { type: ActivityType.Custom }); // Online
    // client.user.setStatus(PresenceUpdateStatus.Idle); // Maintenance

    console.log(`${client.user.tag} is online`)

    client.guilds.cache.forEach(guild => {
        guild.commands.create({
            name: "ping",
            description: "Ottieni il ping corrente dell'App"
        })

        guild.commands.create({
            name: "review",
            description: "Invia una recensione con una valutazione a stelle",
            options:
                [
                    {
                        type: 3,
                        name: "star",
                        description: "La tua valutazione a stelle",
                        required: true,
                        choices:
                            [
                                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" },
                                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                                { name: "⭐⭐", value: "⭐⭐" },
                                { name: "⭐", value: "⭐" },
                            ]
                    }
                ]
        })
    })
})

// interactionCreate

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    // /ping
    if (interaction.commandName == "ping")
        interaction.reply({ content: `Battito Cardiaco: ${interaction.client.ws.ping}ms`, flags: MessageFlags.Ephemeral });

    // /review
    if (interaction.commandName == "review") {
        const star = interaction.options.getString("star");
        const channelReview = client.channels.cache.get("1240733273735434354");

        var embedReview = new EmbedBuilder()
            .setColor("#2B2D31")
            .setAuthor({ name: `${interaction.user.username} ${star}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })

        await interaction.reply({ content: "Grazie per la tua recensione! Il tuo feedback è importante per noi.", flags: MessageFlags.Ephemeral });
        await channelReview.send({ embeds: [embedReview] });
    }
})

// messageCreate

client.on("messageCreate", async (message) => {
    // @Panadero
    if (message.content == "<@1334277961268072570>")
        message.reply({ content: "Puoi utilizzare `/` per vedere i comandi"});

    // #info
    if (message.content == "?info") {
        message.delete();
        message.channel.send({ content: "## <:HomeIcon:1306022804357124148> Benvenuto nella Community!\nHey! Siamo entusiasti di esserti unito alla nostra fantastica community. Per favore prenditi un momento per leggere le regole del server e sentiti libero di presentarti nei canali testuali. Non esitare a contattare i moderatori se hai domande. Buon soggiorno!\n## <:RulesIcon:1306022959126810675> Regolamento Discord\n- **Rispetto:** Tratta tutti i membri allo stesso modo e con rispetto, indipendentemente dalle differenze di credo. Non intraprendere alcuna forma di molestia, bullismo o attacchi mirati nei confronti degli altri membri.\n- **Family-Friendly:** Usa soprannomi e immagini del profilo rispettosi; evita contenuti offensivi o inappropriati. Mantieni il server family-friendly evintando di pubblicare contenuti di natura sessuale.\n- **Canali:** Pubblica contenuti nei canali appropriati per mantenere le discussioni organizzate. Evita conversazioni fuori tema nei canali designati per argomenti specifici.\n- **Segui le regole di Discord:** Rispetta i [Termini di Servizio](https://discord.com/terms) e le [Linee Guida della Community](https://discord.com/guides) di Discord." });
    }

    // #details
    if (message.content == "?details") {
        message.delete();
        message.channel.send({ content: "## <:GamingIcon:1306353011026563122> Minecraft SMP\nPandesal SMP è un server Minecraft con sede in Italia. Il server è attualmente aperto a tutti, ad eccezione dei \"giocatori offline\", per garantire un ambiente più sicuro per tutti.\n- **Java Address:** pandesalmc.aternos.me\n- **Custom Address:** pandesalmc.aternos.me:29767\n- **Bedrock Port:** 29767\n## <:RulesIcon:1306022959126810675> Linee Guida e Termini\nContinuando a giocare su questo server, riconosci e accetti questi termini.\n- **Rispetta le Costruzioni:** Sii rispettoso delle creazioni degli altri giocatori. Evita di danneggiare intenzionalmente o di prendere le loro cose senza permesso. Mostra gentilezza rispettando il loro lavoro.\n- **Fair Play:** Gioca onestamente senza imbrogliare o ottenere vantaggi ingiusti. Inoltre, astieniti dal creare dispositivi redstone che potrebbero causare ritardi nel server e interrompere l'esperienza di tutti.\n- **Sii Gentile:** Tratta gli altri con rispetto ed empatia. Evita il bullismo o l'uso di un linguaggio offensivo. Chiedi sempre il permesso prima di impegnarti in un combattimento giocatore contro giocatore. Ricordati di divertirti e di collaborare all'interno della community SMP di Minecraft per promuovere un ambiente positivo e creativo.\n\n- **Azioni:** Ci riserviamo il diritto di silenziarti, cacciarti, imprigionarti o bannarti se vieni sorpreso a non seguire le regole del server.\n- **Modifiche Player Data:** Potremmo modificare i tuoi dati nel gioco. Ciò include azioni come prendere oggetti dal tuo inventario o cancellare i dati del tuo giocatore.\n- **Modifiche alle Build:** Potremmo alterare le tue costruizioni, inclusa la rimozione di parti della tua base che causano ritardi all'intero server.\n- **Spettatori:** Potremmo osservarti mentre giochi. Questo ci consente di monitorare e rilevare qualsiasi utilizzo di mod o cheat che forniscano vantaggi ingiusti rispetto ad altri giocatori." });
    }
})

// interactionCreate

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    // User Limit
    if (interaction.customId == "buttonUserLimitID") {
        const modalUserLimit = new ModalBuilder()
            .setTitle("Imposta il limite di utenti")
            .setCustomId("modalUserLimitID")

        const limit = new TextInputBuilder()
            .setCustomId("limitID")
            .setLabel("Inserisci un valore tra 1 e 99")
            .setPlaceholder("Write text here")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const rowLimit = new ActionRowBuilder()
            .addComponents(limit)

        modalUserLimit.addComponents(rowLimit)

        await interaction.showModal(modalUserLimit);
    }

    // Private VC
    if (interaction.customId == "buttonPrivateVCID") {
        const voiceChannel = interaction.member.voice.channel;

        if (interaction.channel != voiceChannel)
            await interaction.reply({ content: "Scusa, puoi farlo solo nel tuo canale!", ephemeral: true });

        try {
            await voiceChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, { Connect: !voiceChannel.permissionsFor(interaction.guild.roles.everyone).has(PermissionFlagsBits.Connect) });

            const isChannelPublic = voiceChannel.permissionsFor(interaction.guild.roles.everyone).has(PermissionFlagsBits.Connect);
            const privacyStatus = isChannelPublic ? "Visibile" : "Privato";

            return interaction.reply({ content: `<@${interaction.user.id}> ha impostato la visibilità del canale su: ${privacyStatus}`, allowedMentions: { parse: [] } });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Qualcosa è andato storto. Riprova più tardi.", ephemeral: true });
        }
    }
})

// interactionCreate

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return

    // User Limit
    if (interaction.customId == "modalUserLimitID") {
        const limit = interaction.fields.getTextInputValue("limitID");

        await interaction.channel.setUserLimit(limit);
        await interaction.reply({ content: `<@${interaction.user.id}> ha impostato il limite di utenti su: ${limit}`, allowedMentions: { parse: [], }});
    }
})

// voiceStateUpdate

var voiceManager = new Collection()

client.on("voiceStateUpdate", async (oS, nS) => {
    const { member, guild } = oS;
    const newChannel = nS.channel;
    const oldChannel = oS.channel;
    const JTC = "1186100330669293588";

    var buttonUserLimit = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel("User Limit")
        .setEmoji("<:emoji_person:1005010359024877598>")
        .setCustomId("buttonUserLimitID")

    var buttonPrivateVC =  new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Private VC")
        .setEmoji("<:emoji_lock:1081997893189238864>")
        .setCustomId("buttonPrivateVCID")

    var rowVC = new ActionRowBuilder()
        .addComponents(buttonUserLimit, buttonPrivateVC)

    if (oldChannel !== newChannel && newChannel && newChannel.id === JTC) {
        const voiceChannel = await guild.channels.create({
            name: `${member.user.username}`,
            type: ChannelType.GuildVoice,
            parent: newChannel.parent,
            permissionOverwrites:
                [
                    { id: "1241092172430839848", allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.MoveMembers] },
                    { id: member.id, allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.MoveMembers] },
                    { id: guild.id, allow: [PermissionFlagsBits.Connect] },
                ]
        });

        await voiceChannel.send({ content: "Gestisci il tuo canale vocale qui", components: [rowVC] });
        await voiceManager.set(member.id, voiceChannel.id);
        await newChannel.permissionOverwrites.edit(member, { Connect: true } );

        setTimeout(() => {
            newChannel.permissionOverwrites.delete(member);
        }, 30 * 1000);
        
        return setTimeout(() => {
            member.voice.setChannel(voiceChannel);
        }, 600);
    }

    const JTCCHANNEL = voiceManager.get(member.id);
    const members = oldChannel?.members.filter((m) => !m.user.bot).map((m) => m.id);

    if (JTCCHANNEL && oldChannel.id === JTCCHANNEL && (!newChannel || newChannel.id !== JTCCHANNEL)) {
        if (members.length > 0) {
            var randomID = members[Math.floor(Math.random() * members.length)];
            var randomMember = guild.members.cache.get(randomID);
            randomMember.voice.setChannel(oldChannel).catch(console.error);
            oldChannel.permissionOverwrites.edit(randomMember, { Connect: true, ManageChannels: true }).catch(console.error);

            voiceManager.set(member.id, null);
            voiceManager.set(randomMember.id, oldChannel.id);
        } else {
            voiceManager.set(member.id, null);
            oldChannel.delete().catch((e) => null);
        }
    }
})

// guildMemberAdd

client.on("guildMemberAdd", async (member) => {
    const roleMember = member.guild.roles.cache.get("1140360510978662430");

    if (roleMember)
        member.roles.add(roleMember);
})