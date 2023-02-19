import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://rokuhentai.com/?q=%22Yae+Miko%22'
	conn.sendButton(m.chat, 'Waifu nya om', await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
}
handler.command = /^(yae)$/i
handler.tagsanime = ['anime']
handler.menuanime = ['yae']

export default handler