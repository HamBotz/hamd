import fetch from 'node-fetch'
import bo from 'dhn-api'
let handler = async (m, { conn, usedPrefix }) => {
const res = await bo.Darkjokes()
let button = [
    {buttonId: `${usedPrefix}darkjoke`, buttonText: {displayText: 'NEXT'}, type:1} 
  ]
  let buttonMessage = {
    image: { url: res},
    caption: `*Klik next untuk melanjutkan*`,
    buttons: button,
    headerType: 4
  }

  conn.sendMessage(m.chat, buttonMessage, {quoted: m})
}

handler.help = ['darkjoke']
handler.tags = ['entertainment']
handler.command = /^(darkjoke|darkjokes)$/i
handler.limit = true

export default handler