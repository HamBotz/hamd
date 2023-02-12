import db from '../lib/database.js'
import fetch from 'node-fetch'

let timeout = 120000
let poin = 1999
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	if (m.isGroup && !db.data.chats[m.chat].game) return
	conn.tebakprovinsi = conn.tebakprovinsi ? conn.tebakprovinsi : {}
	let id = m.chat
	if (id in conn.tebakprovinsi) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakprovinsi[id][0])
		throw false
	}
	if (db.data.users[m.sender].limit < 1 && db.data.users[m.sender].money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (db.data.users[m.sender].limit > 0 && !isPrems) db.data.users[m.sender].limit -= 1
	let res = await fetch(`https://api.lolhuman.xyz/api/tebak/provinsi?apikey=${apilol}`)
	if (!res.ok) throw 'Fitur Error!'
	const json = await res.json()
	let caption = `
🎮 *Tebak Provinsi* 🎮

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Exp
`.trim()
	conn.tebakprovinsi[id] = [
		await conn.sendMsg(m.chat, { image: { url: json.result.img }, caption: caption }, { quoted: m }),
		json, poin,
		setTimeout(() => {
			if (conn.tebakprovinsi[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.title}*`, pauthor, ['tebakprovinsi', `${usedPrefix}tebakprovinsi`], conn.tebakprovinsi[id][0])
			delete conn.tebakprovinsi[id]
		}, timeout)
	]
	console.log(json.result.title)
}

handler.menufun = ['tebakprovinsi (exp+)']
handler.tagsfun = ['game']
handler.command = /^(tebakprovinsi)$/i

handler.premium = true

export default handler