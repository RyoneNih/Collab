/*
* Tambahin nama author lah
* Author nya Radya, Farid, and Nazwa
* Tambahin ya zhayank
* Jan numpang nama doank
* Baca readme nya biar gk tanya tanya
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { bahasa } = require('./src/bahasa')
const { negara } = require('./src/kodenegara')
const { virtex } = require('./src/virtex')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const speed = require('performance-now')
const user = JSON.parse(fs.readFileSync('./src/user.json'))
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:�3�9�3�2�3�2�3�1�3�2\n' // full name
            + 'ORG:Owner Bot;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=6282157581762:+62 821-5758-1762\n' // WhatsApp ID + phone number
            + 'END:VCARD'
prefix = '#'
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./Nazwa.json') && client.loadAuthInfo('./Nazwa.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Nazwa.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `�3�9�3�8�3�9�3�2 @${num.split('@')[0]}\n�3�0�3�2�3�9�3�8�3�0�3�8�3�7 �3�1�3�8�3�7�3�8�3�1�3�4 �3�1�3�6 �3�4�3�5�3�2�3�8�3�3 *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝐒𝐚𝐲𝐨𝐧𝐚𝐫𝐚 @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const date = moment.tz('Asia/Jakarta').format('DD,MM,YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '⌄1�7 Sedang di Prosess ⌄1�7',
				success: '✔️ Berhasil ✔️',
				error: {
					stick: '[❗] Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❄1�7',
					Iv: '❄1�7 Link tidak valid ❄1�7'
				},
				only: {
					group: '[❗] Perintah ini hanya bisa di gunakan dalam group! ❄1�7',
					ownerG: '[❗] Perintah ini hanya bisa di gunakan oleh owner group! ❄1�7',
					ownerB: '[❗] Perintah ini hanya bisa di gunakan oleh owner bot! ❄1�7',
					admin: '[❗] Perintah ini hanya bisa di gunakan oleh admin group! ❄1�7',
					Badmin: '[❗] Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❄1�7',
                                        daftarB: `┄1�7┄1�7〄1�7 DAFTAR 」─┄1�7\nHalo kak !\nKamu belum Terdaftar didalam database, \n\nCommand : ${prefix}daftar nama|umur\nContoh : ${prefix}daftar Ryz|17`,
				}
			}
    			const apakah = ['Ya','Tidak']
        		const bisakah = ['Bisa','Tidak Bisa']
		        const kapankah = ['Hari Lagi','Minggu Lagi','Bulan Lagi','Tahun Lagi']
			const botNumber = client.user.jid
			const ownerNumber = ["6282157581762@s.whatsapp.net"]
			const nomorOwner = [ownerNumber]
			const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
                        const isUser = user.includes(sender)

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help':
				case 'menu':
					client.sendMessage(from, help(prefix), text)
					break
                case 'bahasa':
		client.sendMessage(from, bahasa(prefix, sender), text, {quoted: mek})
                break
               case 'virtex':
             if (!isGroup) return reply(mess.only.group)
             if (!isUser) return reply(mess.only.daftarB)
             if (!isOwner) return reply(mess.only.ownerB)
               client.sendMessage(from, virtex(prefix, sender), text, {quoted: mek})
               break
               case 'kodenegara':
               client.sendMessage(from, negara(prefix, sender), text, {quoted: mek})
               break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐓𝐚𝐠 𝐭𝐚𝐫𝐠𝐞𝐭 𝐲𝐚𝐧𝐠 𝐦𝐚𝐮 𝐝𝐢 𝐭𝐮𝐫𝐮𝐧𝐤𝐚𝐧 𝐚𝐝𝐦𝐢𝐧')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝐏𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐝𝐢𝐭𝐞𝐫𝐢𝐦𝐚, 𝐦𝐞𝐧𝐮𝐫𝐮𝐧𝐤𝐚𝐧 𝐣𝐚𝐝𝐢 𝐚𝐝𝐦𝐢𝐧 𝐠𝐫𝐨𝐮𝐩 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝐏𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐝𝐢𝐭𝐞𝐫𝐢𝐦𝐚, 𝐦𝐞𝐧𝐮𝐫𝐮𝐧𝐤𝐚𝐧 @${mentioned[0].split('@')[0]}\n 𝐣𝐚𝐝𝐢 𝐚𝐝𝐦𝐢𝐧 𝐠𝐫𝐨𝐮𝐩 _*${groupMetadata.subject}*_`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'odemote':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝐓𝐚𝐠 𝐭𝐚𝐫𝐠𝐞𝐭 𝐲𝐚𝐧𝐠 𝐦𝐚𝐮 𝐝𝐢 𝐭𝐮𝐫𝐮𝐧𝐤𝐚𝐧 𝐚𝐝𝐦𝐢𝐧')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝐏𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐝𝐢𝐭𝐞𝐫𝐢𝐦𝐚, 𝐦𝐞𝐧𝐮𝐫𝐮𝐧𝐤𝐚𝐧 𝐣𝐚𝐝𝐢 𝐚𝐝𝐦𝐢𝐧 𝐠𝐫𝐨𝐮𝐩 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝐏𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐝𝐢𝐭𝐞𝐫𝐢𝐦𝐚, 𝐦𝐞𝐧𝐮𝐫𝐮𝐧𝐤𝐚𝐧 @${mentioned[0].split('@')[0]}\n 𝐣𝐚𝐝𝐢 𝐚𝐝𝐦𝐢𝐧 𝐠𝐫𝐨𝐮𝐩 _*${groupMetadata.subject}*_`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
                                case 'randomhentai':
                                        gatauda = body.slice(6)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek})
                                        break
                                case 'loli':
                                        gatauda = body.slice(6)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek})
                                        break
                  case 'promote':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di promote!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, menambah jabatan sebagai admin :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, menambah jabatan sebagai admin : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'opromote':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di promote!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, menambah jabatan sebagai admin :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Perintah di terima, menambah jabatan sebagai admin : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				  case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *SELF WHATSAPP* 」\n\n_Request by_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nYour link WhatsApp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
				if (data.error) return reply(data.error)
				reply(data.result)
				break
			case 'quotes':
				client.updatePresence(from, Presence.composing) 
                                if (!isUser) return reply(mess.only.daftarB)
				data = await fetchJson(`http://mhankbarbars.herokuapp.com/api/randomquotes`)
				ez = `*➸ Author :* ${data.author}\n*➸ Quotes :* ${data.quotes}`
				reply(ez)
				break
				case '3dtext':
                data = await await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${body.slice(8)}`)
                if (!isUser) return reply(mess.only.daftarB)
                client.sendMessage(from, data, image, {quoted: mek, caption: body.slice(8)})
                break
                case 'fml':
                data = await fetchJson(`https://docs-jojo.herokuapp.com/api/fml`)
                if (!isUser) return reply(mess.only.daftarB)
                hasil = data.result.fml
                reply(hasil)
                break
              case 'owner':
                case 'creator':
                  client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
               client.sendMessage(from, 'Nih nomor ownerku kak, save ya kak nanti di save balik',MessageType.text, { quoted: mek} )
                break
	case 'hidetag':
                client.updatePresence(from, Presence.composing) 
                if (!isUser) return reply(mess.only.daftarB)
                if (!isGroup) return reply(mess.only.group)
                teks = body.slice(9)
                group = await client.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: mek
                }
              await client.sendMessage(from, options, text)
               break
                                case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, 'Usernamenya mana kak? ', text, {quoted: mek})
                                                if (!isUser) return reply(mess.only.daftarB)
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('username tidak valid')
					}
					break
				case 'snowwrite':
					var gh = body.slice(11)
					var gbl7 = gh.split("|")[0];
					var gbl8 = gh.split("|")[1];
					if (args.length < 1) return reply(`Kirim perintah ${prefix}snowwrite teks1|teks2, contoh ${prefix}snowwrite aqulzz|galuh`)
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					anu = await fetchJson(`https://zeksapi.herokuapp.com/api/snowwrite?text1=${gbl7}&text2=${gbl8}&apikey=apivinz`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'marvellogo':
					var gh = body.slice(12)
					var gbl5 = gh.split("|")[0];
					var gbl6 = gh.split("|")[1];
					if (args.length < 1) return reply(`Kirim perintah ${prefix}marvellogo teks1|teks2, contoh ${prefix}marvellogo aqulzz|galuh`)
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					anu = await fetchJson(`https://zeksapi.herokuapp.com/api/marvellogo?text1=${gbl5}&text2=${gbl6}&apikey=apivinz`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break

				case 'artinama':
                  client.updatePresence(from, Presence.composing) 
                  if (!isUser) return reply(mess.only.daftarB)
                    data = await fetchJson(`https://arugaz.herokuapp.com/api/artinama?nama=${body.slice(10)}`)
                   reply(data.result)
                   break
		case 'infonomor':
               client.updatePresence(from, Presence.composing) 
                 if (!isUser) return reply(mess.only.daftarB)
                 if (args.length < 1) return reply(`Masukan Nomor\nContoh : ${prefix}infonomor 0812345678`)
                data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(11)}`)
                if (data.error) return reply(data.error)
                if (data.result) return reply(data.result)
                hasil = `╠➥ internasional : ${data.international}\n╠➥ nomor : ${data.nomor}\n╠➥ operator : ${data.op}`
                reply(hasil)
                break
		case 'spamcall':
               client.updatePresence(from, Presence.composing)
                 if (!isUser) return reply(mess.only.daftarB)
                 if (args.length < 1) return reply(`Masukan Nomor\nContoh : ${prefix}spamcall 812345678`)
                data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${body.slice(10)}`)
                if (data.msg) return reply(data.msg)
                hasil = data.logs
                reply(hasil)
                break
                   case 'map':
                   data = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`)
                   if (!isUser) return reply(mess.only.daftarB)
                   hasil = await getBuffer(data.gambar)
                   client.sendMessage(from, hasil, image, {quoted: mek, caption: `Hasil Dari *${body.slice(5)}*`})
                   break
                   case 'covid':
                   client.updatePresence(from, Presence.composing) 
                   if (!isUser) return reply(mess.only.daftarB)
                   data = await fetchJson(`https://arugaz.herokuapp.com/api/corona?country=${body.slice(7)}`)
                   if (data.result) reply(data.result)
                   hasil = `Negara : ${data.result.country}\n\nActive : ${data.result.active}\ncasesPerOneMillion : ${data.result.casesPerOneMillion}\ncritical : ${data.result.critical}\ndeathsPerOneMillion : ${data.result.deathsPerOneMillion}\nrecovered : ${data.result.recovered}\ntestPerOneMillion : ${data.result.testPerOneMillion}\ntodayCases : ${data.result.todayCases}\ntodayDeath : ${data.result.todayDeath}\ntotalCases : ${data.result.totalCases}\ntotalTest : ${data.result.totalTest}`
                   reply(hasil)
                   break
				case 'wiki':
					if (args.length < 1) return reply('masukan kata kunci')
					tels = body.slice(6)	
                                        if (!isUser) return reply(mess.only.daftarB)				
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${tels}&apikey=BotWeA`, {method: 'get'})
					reply(anu.result)
					break	
				case 'wikien':
					if (args.length < 1) return reply('masukan kata kunci')
					tels = body.slice(8)		
			                if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/wikien?q=${tels}`, {method: 'get'})
					reply(anu.result)
					break				
				case 'ytmp3':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
                                        if (!isUser) return reply(mess.only.daftarB)
     					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/yta?url=${args[0]}&apiKey=BotWeA`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
					case 'ytmp4':
				if (args.length < 1) return reply('link YouTube nya mana?')
					tels = body.slice(7)				
					reply(mess.wait)
					buffer = await getBuffer(anu.thumb)
				 	anu = await fetchJson(`https://tobz-api.herokuapp.com/api/ytv?url=${tels}&apikey=BotWeA`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					hasil = `*❏ Judul* : ${anu.title}\n*❏ Filesize* : ${anu.filesize}\n*❏ resolution* : ${anu.resolution}\n*❏ Tipe* : ${anu.ext}\n*❏ Link* : ${anu.result}`					
					client.sendMessage(from, buffer, image,  {quoted: mek, caption: hasil})
					break							
				case 'trendtwit':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Hastag* : ${i.hastag}\n*link* : ${i.link}\n*rank* : ${i.rank}\n*Tweet* : ${i.tweet}\n=================\n`
					}
					reply(teks.trim())
					break
				case 'testime':
					setTimeout( () => {
					client.sendMessage(from, 'Waktu habis:v', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '5 Detik lagi', text) // ur cods
					}, 5000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '10 Detik lagi', text) // ur cods
					}, 0) // 1000 = 1s,
					break
				case 'semoji':
					if (args.length < 1) return reply('emojinya mana um?')
                                        if (!isUser) return reply(mess.only.daftarB)
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(8).trim()
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/emoji2png?emoji=${teks}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker)
						fs.unlinkSync(rano)
					})
					break
				case 'nulis': 
				case 'tulis': ini
					if (args.length < 1) return reply('aku suruh nulis apa kak?')
                                        if (!isUser) return reply(mess.only.daftarB)
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nulis?text=halo&apikey=BotWeA`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
	case 'kbbi':
            client.updatePresence(from, Presence.composing) 
                if (args.length < 1) return reply(`Masukan Pertanyaan\nContoh : ${prefix}kbbi asu`)
	      tels = body.slice(6)
              data = await fetchJson(`https://tobz-api.herokuapp.com/api/kbbi?kata=${tels}&apikey=BotWeA`)
              if (data.error) return reply(data.error)
              hasil = `${data.result}`
              reply(hasil)
              break
				case 'joox':
			tels = body.slice(6)
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${tels}`, {method: 'get'})
               if (!isUser) return reply(mess.only.daftarB)
               if (data.error) return reply(data.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}`
                buffer = await getBuffer(data.result.thumb)
                lagu = await getBuffer(data.result.mp3)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
                break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\n*Total Chat* : ${totalchat.length}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
                   case 'chatlist':
					client.updatePresence(from, Presence.composing)  
					teks = 'This is list of chat number :\n'
					for (let all of totalchat) {
						teks += `~> @${all}\n`
					}
					teks += `Total : ${totalchat.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": totalchat}})
					break
				case 'animecry':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/cry', {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'neonime':
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					teks = '################\n'
					for (let i of data.result) {
						teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n###############\n`
					}
					reply(teks.trim())
					break  
					case 'bpink':
              
                  if (args.length < 1) return reply(`Masukan Teks\nContoh : ${prefix}Caliph Bot`)
                data = await getBuffer(`https://docs-jojo.herokuapp.com/api/blackpink?text=${body.slice(7)}`)
                if (!iUser) return reply(mess.only.daftarB)
                client.sendMessage(from, data, image, {quoted: mek, caption: body.slice(7)})
                break
				case 'tts':
				   client.updatePresence(from, Presence.recording) 
				   if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana om?', text, {quoted: mek})
                                   if (!isUser) return reply(mess.only.daftarB)
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'listadmins':
				case 'adminlist':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'pokemon':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
                case 'pinterest':
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓\n\*Hasil Pencarian* : *${body.slice(11)}*`})
					break
				case 'setprefix':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break
				case 'meme':
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(8)}@c.us`, text)
					break
				case 'hilih':
					client.updatePresence(from, Presence.composing) 
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'tagall':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions('╔══✪〘 Mention All 〙✪══\n╠➥'+teks+'╚═〘 - - - - 〙', members_id, true)
					break
                case 'tagall2':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Mention All 〙✪══\n╠➥'+teks+'╚═〘 - - - - 〙', text, {quoted: mek})
					break
                case 'tagall3':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Mention All 〙✪══\n╠➥'+teks+'╚═〘 𝐑𝐘𝐎𝐁𝐎𝐓 〙', text, {detectLinks: false, quoted: mek})
					break
                        case 'tagall4':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}@c.us\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Mention All 〙✪══\n╠➥'+teks+'╚═〘 𝐑𝐘𝐎𝐁𝐎𝐓 〙', text, {quoted: mek})
					break
                case 'tagall5':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}@s.whatsapp.net\n`
						members_id.push(mem.jid)
					}
					reply('╔══✪〘 Mention All 〙✪══\n╠➥'+teks+'╚═〘 𝐑𝐘𝐎𝐁𝐎𝐓 〙')
					break
				case 'send':
					var pc = body.slice(6)
					var nomor = pc.split("|")[0];
					var pesan = pc.split("|")[1];
					client.sendMessage(nomor+'@s.whatsapp.net', pesan, text)
					break
					case 'quotesnime':
					nimek = await fetchJson('https://animechanapi.xyz/api/quotes/random')
					hasil = `anime : ${nimek.data.anime}\nCharacter : ${nimek.data.character}\n${nimek.data.quote}`
					reply(hasil)
					break
				case 'setppbot':
				client.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					if (!isOwner) return reply(mess.only.ownerB)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
					break
				case 'bc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 BROADCAST 」*\n\n${body.slice(4)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 」*\n\n${body.slice(4)}`)
						}
						reply('𝐒𝐔𝐊𝐒𝐄𝐒')
					}
					break
					case 'bcgc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of groupMembers) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 𝐆𝐑𝐎𝐔𝐏 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of groupMembers) {
							sendMess(_.jid, `*「 BC GROUP 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`)
						}
						reply('𝐒𝐔𝐊𝐒𝐄𝐒 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 𝐆𝐑𝐎𝐔𝐏')
					}
					break
				case 'alay':
                    client.updatePresence(from, Presence.composing) 
                    if (!isUser) return reply(mess.only.daftarB)
                    data = await fetchJson(`https://arugaz.herokuapp.com/api/bapakfont?kata=${body.slice(6)}`)
                    reply(data.result)
                    break
                    case 'quotemaker':
                    gh = body.slice(12)
                    if (!isUser) return reply(mess.only.daftarB)
                    teks1 = gh.split("|")[0];
                    teks2 = gh.split("|")[1];
                    teks3 = gh.split("|")[2]
                    data = await fetchJson(`https://terhambar.com/aw/qts/?kata=${teks1}&author=${teks2}&tipe=${teks3}`)
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek, caption: 'neh...'})
                    break
                    case 'glitch':
                    gh = body.slice(8)
                    if (!isUser) return reply(mess.only.daftarB)
                    teks1 = gh.split("|")[0];
                    teks2 = gh.split("|")[1];
                    data = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=glitch&text1=${teks1}&text2=${teks2}&apikey=BotWeA`)
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek, caption: 'neh...'})
                    break
                     case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                     setTimeout( () => {
					client.groupLeave (from) 
					}, 2000)
                     setTimeout( () => {
					client.updatePresence(from, Presence.composing) 
					client.sendMessage(from, 'Sayonara👋', text) // ur cods
					}, 0)
                     break

				case 'chord':
					if (args.length < 1) return reply('judul lagunya mana kak')
                                        if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)					
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/chord?q=${tels}`, {method: 'get'})
					reply(anu.result)
					break
				case 'lirik':
					if (args.length < 1) return reply('Lirik lagunya mana kak?')
                                        if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/lirik?judul=${tels}`, {method: 'get'})
					reply(anu.result)
					break
			case 'igstalk':
                      hmm = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/igs?u=${body.slice(9)}`)
                     buffer = await getBuffer(hmm.data.profilehd)
                     hasil = `Fullname : ${hmm.data.fullname}\npengikut : ${hmm.data.follower}\nMengikuti : ${hmm.data.following}\nPrivate : ${hmm.data.private}\nVerified : ${hmm.data.verified}\nbio : ${hmm.data.bio}`
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    break
                    case 'ownergrup':
				  case 'ownergroup':
               client.updatePresence(from, Presence.composing) 
              options = {
          text: `Owner Group ini adalah : @${from.split("-")[0]}`,
          contextInfo: { mentionedJid: [from] }
           }
           client.sendMessage(from, options, text, { quoted: mek } )
				break
           case 'quran':
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					client.sendMessage(from, quran, text, {quoted: mek})
					break
           case 'nekonime':
           data = await fetchJson('https://waifu.pics/api/sfw/neko')
           if (!isUser) return reply(mess.only.daftarB)
           hasil = await getBuffer(data.url)
           client.sendMessage(from, hasil, image, {quoted: mek})
           break
				case 'neko':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/nekonime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break	
				case 'add':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
				case 'oadd':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
				case 'kick':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					client.sendMessage(mentioned, 'yahaha Lu kekick😂', text)
					}
					break
				case 'okick':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					client.sendMessage(mentioned, 'yahaha Lu kekick😂', text)
					}
					break
				case 'exe':
	              client.updatePresence(from, Presence.composing) 
	              if (!isOwner) return reply(mess.only.ownerB)
	               const cmd = body.slice(5)
	               exec(cmd, (err, stdout) => {
		           if(err) return client.sendMessage(from, "Command Salah", text, { quoted: mek })
		           if (stdout) {
			       client.sendMessage(from, stdout, text, { quoted: mek })
		           }
	           })
                  break
                 case 'linkgroup':
				case 'linkgrup':
				case 'linkgc':
				    client.updatePresence(from, Presence.composing) 
				    if (!isGroup) return reply(mess.only.group)
                                     if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = await client.groupInviteCode (from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\nLink Group *${groupName}*`
					client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
					break
                case 'qrcode':
                buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?data=${body.slice(8)}&size=1080%C3%971080`)
				client.sendMessage(from, buff, image, {quoted: mek})
				break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja mas')
					}
					break

				case 'bugreport':
				client.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply('Bugnya apa kak?')
					tek = body.slice(10)
					bug = {
					text: `*[𝐁𝐔𝐆 𝐑𝐄𝐏𝐎𝐑𝐓]*\n\n*Pengirim :* @${sender.split("@")[0]}\n*Pada Jam :* ${time}\n*Pesan :* ${tek}`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.sendMessage(nomorOwner, bug, text, {quoted: mek})
					client.sendMessage(from, 'Laporan mu telah dikirim ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', text, {quoted: mek})
					break
               case 'apakah':
               client.updatePresence(from, Presence.composing) 

               random = apakah[Math.floor(Math.random() * (apakah.length))]
  	
			   hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random}*`
			   reply(hasil)
			   break
              case 'bisakah':
                client.updatePresence(from, Presence.composing) 
              if (!isUser) return reply(mess.only.daftarB)
                random = bisakah[Math.floor(Math.random() * (bisakah.length))]
  	
			   hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random}*`
			   reply(hasil)
			   break
               case 'rate':
              client.updatePresence(from, Presence.composing) 
              if (!isUser) return reply(mess.only.daftarB)
                random = `${Math.floor(Math.random() * 100)}`
               hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random}%*`
              reply(hasil)
                break
	    case 'kapan':
               client.updatePresence(from, Presence.composing) 
                if (!isUser) return reply(mess.only.daftarB)
               random = kapankah[Math.floor(Math.random() * (kapankah.length))]
               random2 = `${Math.floor(Math.random() * 8)}`
               hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random2} ${random}*`
              reply(hasil)
                break
			case 'closegc':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grup ditutup oleh admin @${nomor.split("@s.whatsapp.net")[0]}\nsekarang *hanya admin* yang dapat mengirim pesan`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
                case 'opengc':
                case 'bukagc':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `Grup dibuka oleh admin @${sender.split("@")[0]}\nsekarang *semua peserta* dapat mengirim pesan`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
				case 'stiker':
				case 'sticker':
				case 'stickergif':
				case 'stikergif':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
                                                if (!isUser) return reply(mess.only.daftarB)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						}
						break
				case 'animehug':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/hug&apikey=BotWeA', {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break

				case 'toimg':
				    client.updatePresence(from, Presence.composing)
                                    if (!isUser) return reply(mess.only.daftarB)
					if (!isQuotedSticker) return reply('❌ reply stickernya um ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi sticker ke gambar ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
                	case 'tomp3':
                	client.updatePresence(from, Presence.composing) 
                        if (!isUser) return reply(mess.only.daftarB)
					if (!isQuotedVideo) return reply('❌ reply videonya um ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi video ke mp3 ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break

                case 'ninjalogo':
                      if (args.length < 1) return reply('Teks nya mana?')
                      if (!isUser) return reply(mess.only.daftarB)
                      gh = body.slice(11)
                      gl1 = gh.split("|")[0];
                      gl2 = gh.split("|")[1];
                      reply(mess.wait)
                      anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=ninjalogo&text1=${gl1}&text2=${gl2}`, {method: 'get'})
                      buff = await getBuffer(anu.result)
                      client.sendMessage(from, buff, image, {quoted: mek})
                      break
                         case 'play':
                reply(mess.wait)
                anu = await fetchJson(`https://api.vhtear.com/ytmp3?query=${body.slice(6)}&apikey=yourapikey`)
               if (!isUser) return reply(mess.only.daftarB)
               if (anu.error) return reply(anu.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${anu.result.title}\nDurasi : ${anu.result.duration}\nUkuran : ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
                buffer = await getBuffer(anu.result.thumb)
                lagu = await getBuffer(anu.result.mp3)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                break
                      case 'joox2':
                reply(mess.wait)
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=BotWeA`, {method: 'get'})
               if (data.error) return reply(data.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}\n*Filesize* : ${data.filesize}\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                buffer = await getBuffer(data.result.thumb)
                lagu = await getBuffer(data.result.mp3)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
                break
                     case 'infocuaca':
                   anu = await fetchJson(`http://tobz-cuaca.herokuapp.com/?menu=cuaca&wilayah=${body.slice(6)}&apiKey=SLpvUgOcMYwIx0pFeELt`, {method: 'get'})
                   if (!isUser) return reply(mess.only.daftarB)
                   if (anu.error) return reply(anu.error)
                   hasil = ` *Tempat : ${anu.tempat}\nCuaca : ${anu.cuaca}\nAngin : ${anu.angin}\nSuhu : ${anu.suhu}\nKelembapan : ${anu.kelembapan}`
                   client.sendMessage(from, hasil, text, {quoted: mek})
                   break
                              case 'game':
					anu = await fetchJson(`http://rt-files.000webhostapp.com/tts.php?apikey=rasitech`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban+'\n'+anu.result.desk, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, anu.result.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
                                  case 'daftar':
					client.updatePresence(from, Presence.composing)
					if (isUser) return reply('kamu sudah terdaftar')
					if (args.length < 1) return reply(`Parameter Salah\nCommand : ${prefix}daftar nama|umur\nContoh : ${prefix}daftar Ryone|20`)
					var reg = body.slice(8)
					var jeneng = reg.split("|")[0];
					var umure = reg.split("|")[1];
						user.push(sender)
						fs.writeFileSync('./src/user.json', JSON.stringify(user))
						client.sendMessage(from, `\`\`\`Pendaftaran berhasil dengan SN: TM08GK8PPHBSJDH10J\`\`\`\n\n\`\`\`Pada ${date} ${time}\`\`\`\n\`\`\`[Nama]: ${jeneng}\`\`\`\n\`\`\`[Nomor]: wa.me/${sender.split("@")[0]}\`\`\`\n\`\`\`[Umur]: ${umure}\`\`\`\n\`\`\`Untuk menggunakan bot\`\`\`\n\`\`\`silahkan\`\`\`\n\`\`\`kirim ${prefix}help\`\`\`\n\`\`\`\nTotal Pengguna ${user.length}\`\`\``, text, {quoted: mek})
					break
                                case 'welcome':
					if (!isGroup) return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('ketik 1 untuk mengaktifkan')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('fitur sudah aktif')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝐒𝐔𝐊𝐒𝐄𝐒 ❭ mengaktifkan fitur welcome di group ini')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, disable)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝐒𝐔𝐊𝐒𝐄𝐒 ❭ menonaktifkan fitur welcome di group ini')
					} else {
						reply('ketik 1 untuk mengaktifkan, 0 untuk menonaktifkan fitur')
					}
                                        break
				case 'owelcome':
					if (!isGroup) return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('ketik 1 untuk mengaktifkan')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('fitur sudah aktif')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝐒𝐔𝐊𝐒𝐄𝐒 ❭ mengaktifkan fitur welcome di group ini')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, disable)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝐒𝐔𝐊𝐒𝐄𝐒 ❭ menonaktifkan fitur welcome di group ini')
					} else {
						reply('ketik 1 untuk mengaktifkan, 0 untuk menonaktifkan fitur')
					}
                                        break
                                case 'fakta':
					fakta = body.slice(1)
                                        if (!isUser) return reply(mess.only.daftarB)
					const fakta =['Massa bumi mencapai 5.972.190.000.000.000.000.000.000 kg. Mesekipun sedemikian berat, faktanya bumi memiliki kecepatan 107.281 km per jam untuk mengitari matahari. Cepat sekali, bukan?','Massa berat bumi didominasi debu-debu antariksa dan dapat berkurang akibat gas seperti hidrogen yang berkurang tiga kilogram setiap detiknya. Fakta unik ini menunjukkan bahwa bumi akan kehilangan 95 ribu ton massa setiap tahunnya','Pada 2018 populasi manusia diperkirakan mencapai 7,6 miliar orang. Meskipun bumi dipenuhi manusia, fakta unik mengungkapkan bahwa manusia tidak memengaruhi massa bumi. Hal ini dikarenakan manusia terbentuk dari atom dalam bentuk oksigen 65 persen, karbon 18,5 persen, dan hidrogen 9,5 persen.','bumi dipenuhi oleh 70 persen air sehingga kerap wajar jika bumi disebut dengan nama planet air. Lautan bumi yang paling dalam adalah Palung Mariana dengan kedalaman 10.994 meter di bawah air. Fakta unik dibalik Palung Mariana adalah jika kamu meletakkan Gunung Everest di sana, puncak tertingginya bahkan masih berada di bawah permukaan laut sejauh 1,6 kilometer!','Faktanya bumi yang manusia tinggali hanya satu persen bagian dari keseluruhan planet bumi. Fakta unik ini menunjukkan bahwa masih banyak bagian bumi yang memiliki misteri kehidupan. Tertarik melakukan penjelajahan untuk menguak misteri sekaligus fakta unik di bagian bumi lainnya','Terdapat sebuah kota di Rusia yang jalanannya tertata rapi dengan sebuah istana yang didesain seperti catur yang megah. Pembuatan pemukiman tersebut didalangi oleh presiden yang terobsesi dengan catur bernama Kirsan Ilyumzhinov.','Apakah kamu tahu fakta unik mengenai mozzarella yang dibuat dari susu kerbau dan bukan susu sapi? Sekitar 500 tahun yang lalu di Campania, Italia, mozzarella dibuat pertama kali menggunakan susu kerbau. Fakta unik dibalik penggunaan susu kerbau ini karena kandungan protein susu kerbau 10-11% lebih banyak daripada susu sapi.','Bali memiliki fakta unik karena memliki banyak hari libur yang disumbangkan oleh sejumlah hari raya besar keagamaan. Hampir setiap hari besar keagamaan ini setiap orang akan mendapatkan libur. Beberapa hai libur diantaranya adalah hari raya galungan, kuningan, nyepi, pagerwesi, saraswati, dan sejumlah upacara besar lainnya seperti piodalan (pujawali).','Ibukota Jakarta memiliki banyak pesona juga fakta unik yang mungkin belum kamu ketahui. Sebelum diberi nama Jakarta, Ibukota Indonesia ini telah memiliki beberapa kali perubahan nama. Nama Ibukota Indonesia sesuai urutan perubahannya diantaranya adalah Sunda Kelapa, Jayakarta, Batavia, Betawi, Jacatra, Jayakarta, dan Jakarta.','Pada tahun 1952 jendela pesawat didesain dalam bentuk persegi namun penggunaannya dinilai cacat sehingga tidak  diterapkan kembali. Jendela yang bulat dirancang untuk menyiasati perbedaan tekanan udara dalam dan luar pesawat untuk menghindari kegagalan struktural yang dapat menyebabkan kecelakaan pesawat.','Makanan utama dari nyamuk jantan dan betina pada umumnya adalah nektar dan zat manis yang sebagian besar diperoleh dari tanaman. Namun nyamuk membutuhkan protein tambahan unuk bertelur yang bisa didapatkan dari manusia sedangkan nyamuk jantan tidak membutuhkan zat protein tambahan untuk bertelur.','Jembatan suramadu (surabaya-madura) adalah jembatan terpanjang di Asia Tenggara (5438 m).','Tertawa dan bahagia meningkatkan imun, terutama produksi sel-sel pembunuh alamiah yang membantu melindungi tubuh dari penyakit','Kecoa kentut setiap 15 menit dan terus mengeluarkan gas metana (kentut) selama 18 jam setelah kematian.','Mengoleskan jeruk nipis dapat mencerahkan bagian lutut / siku yang hitam.','Energi yang dihasilkan oleh angin ribut (topan) selama 10 menit lebih besar dibandingkan energi dari bom saat perang','Satu-satunya indera manusia yang tidak berfungsi saat tidur adalah indera penciuman.','Para astronot dilarang makan makanan berjenis kacang-kacangan sebelum pergi ke luar angkasa. Karena bisa menyebabkan mereka mudah kentut. Dan gas kentut sangat membahayakan bagi baju luar angkasa mereka.','Di AS saja, kucing membunuh miliaran hewan dalam kurun waktu setahun. Mereka bertanggung jawab atas kematian 1,4 - 73,7 miliar burung dan 6,9 - 20,7 miliar mamalia setiap tahun. Bukan hanya itu, sejauh ini mereka benar-benar memusnahkan total 33 spesies dari dunia.','Ikan hiu kehilangan gigi lebih dari 6000buah setiap tahun, dan gigi barunya tumbuh dalam waktu 24 jam.','Semut dapat mengangkat Beban 50 kali tubuhnya.','Mulut menghasilkan 1 liter ludah setiap hari.','Siput bisa tidur selama 3 tahun','Kecoak bisa hidup 9 hari tanpa kepala, dan akan mati karena kelaparan','Mata burung unta lebih besar dari otaknya']
					const keh = fakta[Math.floor(Math.random() * fakta.length)]
					client.sendMessage(from, 'fakta : '+ keh, { quoted: mek })
					break
                                case 'water':
					if (args.length < 1) return reply(mess.blank)
                                        if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)
					if (tels.length > 15) return reply('Teksnya kepanjangan, maksimal 20 karakter')
					reply(mess.wait)
					anu = await fetchJson(`https://zeksapi.herokuapp.com/api/tfire?text=${tels}&apikey=xptnbot352`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'firetext':
					if (args.length < 1) return reply(mess.blank)
                                        if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)
					if (tels.ength > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					anu = await fetchJson(`https://zeksapi.herokuapp.com/api/tlight?text=${tels}&apikey=xptnbot352`, {method: 'get'})
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
                                case 'gantengcek':
					if (isUser) return reply(mess.only.daftarB)
					ganteng = body.slice(1)
					const gan =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+ganteng+'*\n\nJawaban : '+ teng+'%', text, { quoted: mek })
					break
					case 'cantikcek':
					if (isUser) return reply(mess.only.daftarB)
					cantik = body.slice(1)
					const can =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const tik = can[Math.floor(Math.random() * can.length)]
					client.sendMessage(from, 'Pertanyaan : *'+cantik+'*\n\nJawaban : '+ tik+'%', text, { quoted: mek })
					break
				case 'watak':
				if (isUser) return reply(mess.only.daftarB)
					watak = body.slice(1)
					const wa =['peny ayang','pem urah','Pem arah','Pem aaf','Pen urut','Ba ik','bap eran','Baik Hati','peny abar','Uw u','top deh, poko knya','Suka Memb antu']
					const tak = wa[Math.floor(Math.random() * wa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: mek })
				    break
				case 'hobby':
				if (isUser) return reply(mess.only.daftarB)
					hobby = body.slice(1)
					const hob =['Memasak','Membantu Atok','Mabar','Nobar','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					client.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: mek })
					break
                                case 'nsfwneko':
				    try{
						if (!isNsfw) return reply('❌ *NSFW MATI* ❌')
                                                if (!isUser) return reply(mess.only.daftarB)
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'mesum'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
                                case 'shota':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomshota?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
                                                if (!isUser) return reply(mess.only.daftarB)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nich'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				case 'logowolf':
					var gh = body.slice(11)
					var teks1 = gh.split("|")[0];
					var teks2 = gh.split("|")[1];
					if (args.length < 1) return reply(`teksnya mana? contoh ${prefix}logowolf Nazwa|Canss`)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo1&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break				
                                 case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('ketik 1 untuk mengaktifkan')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('fitur sudah aktif')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝐒𝐔𝐊𝐒𝐄𝐒 ❭ mengaktifkan fitur nsfw di group ini')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝐒𝐔𝐊𝐒𝐄𝐒 ❭ menonaktifkan fitur nsfw di group ini')
					} else {
						reply('ketik 1 untuk mengaktifkan, 0 untuk menonaktifkan fitur')
					}
					break	
				case 'bucin':
					gatauda = body.slice(7)					
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/howbucins`, {method: 'get'})
					reply(anu.desc)
					break	
				case 'quotes2':
					gatauda = body.slice(8)					
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/randomquotes`, {method: 'get'})
					reply(anu.quotes)
					break		
			    case 'waifu':
					gatauda = body.slice(7)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/nekonime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image,{quoted: mek})
					break
				case 'randomanime':
					gatauda = body.slice(13)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break						
				case 'logowolf2':
					var gh = body.slice(11)
					var teks1 = gh.split("|")[0];
					var teks2 = gh.split("|")[1];
					if (args.length < 1) return reply(`teksnya mana? contoh ${prefix}logowolf Nazwa|Canss`)
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo2&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break	
                                case 'delete':
					case 'del':
					if (!isGroup)return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins)return reply(mess.only.admin)
					client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                        if (!isUser) return reply(mess.only.daftarB)
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja mas')
					}
					break
				default:

   				         if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Maaf *${pushname}*, Command *${prefix}${command}* Tidak Terdaftar Di Dalam *${prefix}menu*!`)
                                        }
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
