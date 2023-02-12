import db from '../lib/database.js'
import fetch from 'node-fetch'
/**
 * @type {import('@adiwajshing/baileys')}
 */
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn, text, participants }) => {
	if (db.data.settings[conn.user.jid].restrict) throw `[ RESTRICT ENABLED ]`
	if (!text) throw `Yang mau di add siapa ? Jin ya ?`
	try {
		let _participants = participants.map(user => user.id)
		let users = (await Promise.all(
			text.split(',')
				.map(v => v.replace(/[^0-9]/g, ''))
				.filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
				.map(async v => [
					v,
					await conn.onWhatsApp(v + '@s.whatsapp.net')
				])
		)).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
		const response = await conn.query({
			tag: 'iq',
			attrs: {
				type: 'set',
				xmlns: 'w:g2',
				to: m.chat,
			},
			content: users.map(jid => ({
				tag: 'add',
				attrs: {},
				content: [{ tag: 'participant', attrs: { jid } }]
			}))
		})
		const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
		const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
		const add = getBinaryNodeChild(response, 'add')
		const participant = getBinaryNodeChildren(add, 'participant')
		for (const user of participant.filter(item => item.attrs.error == 403)) {
			const jid = user.attrs.jid
			const content = getBinaryNodeChild(user, 'add_request')
			const invite_code = content.attrs.code
			const invite_code_exp = content.attrs.expiration
			let teks = `Mengundang @${jid.split('@')[0]} menggunakan invite...`
			m.reply(teks, null, {
				mentions: conn.parseMention(teks)
			})
			await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, await conn.getName(m.chat), 'Invitation to join my WhatsApp group', jpegThumbnail)
		}
	} catch (e) {
		console.log(e)
		let tes = Object.values(await conn.groupInviteCode())
		console.log(tes)
		m.reply(`Invalid WhatsApp number.`)
	}
}

handler.menugroup = ['add']
handler.tagsgroup = ['group']
handler.command = /^(add)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true


export default handler

