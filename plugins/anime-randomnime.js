import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
let res = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/random.txt')
let txt = await res.text()
let arr = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]
let button = [
  {buttonId: `${usedPrefix}randomanime`, buttonText: {displayText: 'NEXT'}, type:1} 
  ]
  let buttonMessage = {
  image: { url: cita},
  caption: `*Klik next untuk melanjutkan*`,
  buttons: button,
  headerType: 4
  } 
conn.sendMessage(m.chat, buttonMessage, {quoted: m})
}
handler.tagsanime = ['anime']
handler.menuanime = ['randomanime']
handler.command = /^(randomanime|animerandom)$/i
handler.limit = true

export default handler