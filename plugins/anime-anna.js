import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
	const url = 'https://api.zeeoneofc.xyz/api/anime/anna?apikey=5Cd8U3tG'
	let button = [
		{buttonId: `${usedPrefix}anna`, buttonText: {displayText: 'NEXT'}, type:1} 
	  ]
	  let buttonMessage = {
		image: { url: url},
		caption: `*Klik next untuk melanjutkan*`,
		buttons: button,
		headerType: 4
	  } 
	  conn.sendMessage(m.chat, buttonMessage, {quoted: m})
}
handler.command = /^(anna)$/i
handler.tagsanime = ['anime']
handler.menuanime = ['anna']
handler.limit = true

export default handler