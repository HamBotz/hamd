import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.zeeoneofc.xyz/api/anime/anna?apikey=5Cd8U3tG'
	conn.sendButton(m.chat, 'Waifu nya om (≧ω≦)', await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
}
handler.command = /^(anna)$/i
handler.tagsanime = ['anime']
handler.menuanime = ['anna']
handler.limit = true

export default handler