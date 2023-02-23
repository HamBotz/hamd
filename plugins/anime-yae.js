import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
	let url = 'https://rokuhentai.com/?q=%22Yae+Miko%22'
	let button = [
		{buttonId: `${usedPrefix}yae`, buttonText: {displayText: 'NEXT'}, type:1} 
		]
		let buttonMessage = {
		image: { url: url},
		caption: `*Klik next untuk melanjutkan*`,
		buttons: button,
		headerType: 4
		} 
	  conn.sendMessage(m.chat, buttonMessage, {quoted: m})
}
handler.command = /^(yae)$/i
handler.tagsanime = ['anime']
handler.menuanime = ['yae']

export default handler