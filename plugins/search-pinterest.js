import { pinterest } from '@bochilteam/scraper'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example use ${usedPrefix + command} minecraft`
  const json = await pinterest(text)
  const result = json.getRandom()
  let button = [
    {buttonId: `${usedPrefix}pinterest ${text}}`, buttonText: {displayText: 'NEXT'}, type:1} 
  ]
  let buttonMessage = {
    image: { url: result},
    caption: `*Klik next untuk melanjutkan*`,
    buttons: button,
    headerType: 4
  }

  conn.sendMessage(m.chat, buttonMessage, {quoted: m})
}
handler.help = ['pinterest <keyword>']
handler.tags = ['searching']
handler.command = /^(pinterest)$/i

export default handler