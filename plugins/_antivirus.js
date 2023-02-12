import db from '../lib/database.js'

export async function before(m, { isAdmin, isBotAdmin }) {
	if (m.isGroup) {
		let chat = db.data.chats[m.chat]
		if (m.text.length > 40000 && chat.antivirus && isBotAdmin) {
			try {
				await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
				await this.updateBlockStatus(m.sender, 'block')
				await this.reply(m.chat, `@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} *terdeteksi* mengirim Virus !`, fkontak, { mentions: [m.sender] })
				await this.sendMsg(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender } })
			} catch (e) {
				console.log(e)
			}
		}
	} else {
		if (m.text.length > 40000) {
			try {
				await this.updateBlockStatus(m.sender, 'block')
			} catch (e) {
				console.log(e)
			}
		}
	}
	return !0
}