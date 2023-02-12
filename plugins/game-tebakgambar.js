import db from '../lib/database.js'
import { tebakgambar } from '@bochilteam/scraper'

let timeout = 120000
let poin = 3499
let handler = async (m, { conn, usedPrefix, isPrems }) => {
	if (m.isGroup && !db.data.chats[m.chat].game) return
	conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
	let id = m.chat
	if (id in conn.tebakgambar) {
		conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0])
		throw false
	}
	if (db.data.users[m.sender].limit < 1 && db.data.users[m.sender].money > 50000 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`
	else if (db.data.users[m.sender].limit > 0 && !isPrems) db.data.users[m.sender].limit -= 1
	const json = await tebakgambar()
	let caption = `
🎮 *Tebak Gambar* 🎮

${json.deskripsi}

⭔ Timeout *${(timeout / 1000).toFixed(2)} detik*
⭔ Bonus: ${poin} Money
`.trim()
	conn.tebakgambar[id] = [
		await conn.sendMsg(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }),
		json, poin,
		setTimeout(() => {
			if (conn.tebakgambar[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, pauthor, ['tebakgambar', `${usedPrefix}tebakgambar`], conn.tebakgambar[id][0])
			delete conn.tebakgambar[id]
		}, timeout)
	]
	console.log(json.jawaban)
}

handler.menufun = ['tebakgambar (money+)']
handler.tagsfun = ['game']
handler.command = /^(tebakgambar)$/i

handler.premium = true

export default handler