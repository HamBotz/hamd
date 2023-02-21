import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
	let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
    let nek = ne.split('\n')
    let neko = pickRandom(nek)
    let button = [
      {buttonId: `${usedPrefix}neko`, buttonText: {displayText: 'NEXT'}, type:1} 
      ]
      let buttonMessage = {
      image: { url: neko},
      caption: `*Klik next untuk melanjutkan*`,
      buttons: button,
      headerType: 4
      } 
    conn.sendMessage(m.chat, buttonMessage, {quoted: m})
}
handler.command = /^(neko)$/i
handler.tagsanime = ['anime']
handler.menuanime = ['neko']
export default handler
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}