import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
	let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
    let nek = ne.split('\n')
    let neko = pickRandom(nek)
	conn.sendButton(m.chat, 'Nyaww~ 🐾', neko, [['Next','.neko']],m)
}
handler.command = /^(neko)$/i
handler.tagsanime = ['anime']
handler.menuanime = ['neko']
export default handler
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}