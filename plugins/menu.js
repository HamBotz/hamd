import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import moment from 'moment-timezone'
import { xpRange } from '../lib/levelling.js'
import { readMore, ranNumb, padLead, runtime } from '../lib/others.js'
import fs from 'fs'
import fetch from 'node-fetch'
import os from 'os'

let tagsm = {}
const defaultMenu = {
	before: `
╭─────═[ INFO USER ]═─────⋆
│╭───────────────···
┴│☂︎ Name: %name
⬡│☂︎ Tag: %tag
⬡│☂︎ Limit: %limit Limit
⬡│☂︎ Money: %money
⬡│☂︎ *Role: %role
⬡│☂︎ Level : %level
⬡│☂︎ Xp: %exp / %maxexp
┬│☂︎ Total Xp: %totalexp
│╰────────────────···
┠─────═[ TODAY ]═─────⋆
│╭────────────────···
┴│    *${ucapan()} %name!*
⬡│☂︎ Tanggal: %week %weton
⬡│☂︎ Date: %date
⬡│☂︎ Tanggal Islam: %dateIslamic
┬│☂︎ Waktu:  %time
│╰────────────────···
┠─────═[ INFO BOT ]═─────⋆
│╭────────────────···
┴│☂︎ Nama Bot: %me
⬡│☂︎ Mode: %mode
⬡│☂︎ Prefix: [ %_p ]
⬡│☂︎ Baileys: Multi Device
⬡│☂︎ Battery: ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
⬡│☂︎ Platform: %platform
⬡│☂︎ Type: Node.Js
⬡│☂︎ Uptime: %uptime
┬│☂︎ Database: %totalreg User
│╰────────────────···
╰──────────═┅═──────────`.trimStart(),
	header: '╭─「 %category 」',
	body: '│ • %cmd %islimit %isPremium',
	footer: '╰────\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems, args, usedPrefix, command }) => {
	try {
		let jam = new Date().getHours()
		let meh = padLead(ranNumb(43), 3)
		//let meh2 = ranNumb(2)
		let meh2 = 2
		let nais = fs.readFileSync(`./media/picbot/menus/menus_${meh}.jpg`)
		let { exp, money, limit, level, role } = db.data.users[m.sender]
		let { min, xp, max } = xpRange(level, global.multiplier)
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let uptime = runtime(process.uptime()).trim()
		let osarch = os.arch()
		let oscpu = os.cpus().slice(0,1).map(v => v.model.split('@')[0].replace(' CPU','').replace('Intel(R) ','').trim())
		let osspeed = os.cpus().slice(0,1).map(v => v.model.split('@')[1])
		let oscore = os.cpus().length
		let osversion = os.version().split(/single|datacenter/gi)[0].trim()
		let osrelease = os.release()
		let osuptime = runtime(os.uptime()).trim()
		let totalreg = Object.keys(db.data.users).length
		let helpm = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				helpm: Array.isArray(plugin.tagsm) ? plugin.helpm : [plugin.helpm],
				tagsm: Array.isArray(plugin.tagsm) ? plugin.tagsm : [plugin.tagsm],
				prefix: 'customPrefix' in plugin,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of helpm)
			if (plugin && 'tagsm' in plugin)
				for (let tag of plugin.tagsm)
					if (!(tag in tagsm) && tag) tagsm[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tagsm).map(tag => {
				return header.replace(/%category/g, tagsm[tag]) + '\n' + [
					...helpm.filter(menu => menu.tagsm && menu.tagsm.includes(tag) && menu.helpm).map(menu => {
						return menu.helpm.map(helpm => {
							return body.replace(/%cmd/g, menu.prefix ? helpm : '%_p' + helpm)
								.replace(/%islimit/g, menu.limit ? '(Limit)' : '')
								.replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			})
		].join('\n')
		let mode = global.opts['self'] ? 'Private' : 'Publik'
		let tag = `@${m.sender.split('@')[0]}`
		let platform = os.platform()
		let ucpn = `${ucapan()}`
    	let d = new Date(new Date + 3600000)
    	let locale = 'id'
		let week = d.toLocaleDateString(locale, { weekday: 'long' })
    	let date = d.toLocaleDateString(locale, {
      	day: 'numeric',
      	month: 'long',
      	year: 'numeric'
    	})
		let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    	// d.getTimeZoneOffset()
    	// Offset -420 is 18.00
    	// Offset    0 is  0.00
    	// Offset  420 is  7.00
    	let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    	let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      	day: 'numeric',
      	month: 'long',
      	year: 'numeric'
    	}).format(d)
    	let time = d.toLocaleTimeString(locale, {
      	hour: 'numeric',
      	minute: 'numeric',
      	second: 'numeric'
    	})
		let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    	let wibh = moment.tz('Asia/Jakarta').format('HH')
    	let wibm = moment.tz('Asia/Jakarta').format('mm')
    	let wibs = moment.tz('Asia/Jakarta').format('ss')
    	let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    	let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    	let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p, uptime, osuptime, osarch, oscpu, osspeed, oscore, osrelease, osversion,
			me: conn.getName(conn.user.jid),
			exp: exp - min,
			money: money,
			maxexp: xp,
			totalexp: exp,
			xp4levelup: max - exp,
			level, limit, name, totalreg, role, tag, week, weton, date, dateIslamic, time, mode, _p, platform,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		if (meh2 == 1) {
			conn.sendHydrated(m.chat, text.replaceAll('#','```').trim(), pauthor, nais, 'https://cutt.ly/azamilaifuu', 'Minimalist ツ Sweet', null, null, [
				['Premium', '.premium'],
				['Contact', '.owner'],
				['⦿ ALL MENU ⦿', '.menuall']
			], m)
		} else {
			if (!args[0]) {
				const sections = [
					{
						title: `━ ━ ━ ━ 『 MAIN 』 ━ ━ ━ ━`,
						rows: [
							{title: '⚡ PREMIUM', rowId: usedPrefix + 'sewa', description: 'Premium, Sewabot, Jadibot, Jasa Run Bot'},
							{title: '🎫 OWNER', rowId: usedPrefix + 'owner', description: 'Chat P tidak dibalas'},
							{title: '📁 Source Code', rowId: usedPrefix + 'sc', description: 'Original Base'}
						]
					}, {
						title: `━ ━ ━ ━ 『 SUB MENU 』 ━ ━ ━ ━`,
						rows: [
							{title: '🪷 OWNER', rowId: usedPrefix + 'menuowner', description: '◉ Owner, ROwner, Mods Privilages'},
							{title: '🎎 ANIME', rowId: usedPrefix + 'menuanime', description: '◉ Cari Manga, Anime, Random Pic'},
							{title: '⌛ DOWNLOAD', rowId: usedPrefix + 'menudownload',  description: '◎ Youtube, Facebook, Tiktok, Dll...'},
							{title: '🎮 GAMES & FUN', rowId: usedPrefix + 'menufun', description: '⊛ RPG, Kuis, Anonymous'},
							{title: '🐳 GENSHIN IMPACT', rowId: usedPrefix + 'menugenshin', description: '⊜ genshin.dev API'},
							{title: '🔞 NSFW', rowId: usedPrefix + 'menunsfw', description: '◓ Fitur Afakah Ini ?'},
							{title: '👥 GROUP', rowId: usedPrefix + 'menugroup', description: '◒ Command Dalam Grup'},
							{title: '🗺 EDITOR', rowId: usedPrefix + 'menueditor',  description: 'ⓞ Kreasi Foto'},
							{title: '💫 EPHOTO 360', rowId: usedPrefix + 'menuephoto', description: '⦿ Edit Foto Kamu'},
							{title: '👼🏻 PHOTO OXY', rowId: usedPrefix + 'menuoxy', description: '◐ Edit Photos by Oxy'},
							{title: '🎨 TEXT PRO ME', rowId: usedPrefix + 'menutextpro', description: '◑ Kreasi Teks Efek'},
						]
					}, {
						title: `━ ━ ━ ━ 『 MISC 』 ━ ━ ━ ━`,
						rows: [
							{title: '🏓 PING', rowId: usedPrefix + 'ping'},
							{title: '🚄 SPEEDTEST', rowId: usedPrefix + 'speedtest'},
							{title: '🎎 DONASI', rowId: usedPrefix + 'donasi'},
						]
					}
				]
				const listMessage = {
					text: text.replaceAll('#','```').trim(),
					footer: pauthor,
					urlButton: { displayText: 'GroupBot',
					url: 'https://chat.whatsapp.com/E00H4H5B83jFOmlV8DVO94' },
					//title: '',
					buttonText: `MENU`,
					sections
				}
				await conn.sendMsg(m.chat, listMessage, {quoted: ftrol})
			}
		}
	} catch (e) {
		throw e
	}
}

handler.command = /^((m(enu)?|help)(list)?|\?)$/i

export default handler


/// FUNCTION ALL
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Lord 🌄"
  }
  if (time >= 10) {
    res = "Siang Lord ☀️"
  }
  if (time >= 15) {
    res = "Sore Lord 🌇"
  }
  if (time >= 18) {
    res = "Malam Lord 🌙"
  }
  return res
}