import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendButton(m.chat, 'Istri kartun', json.url, [['waifu', `${usedPrefix}waifu`]], m)
}
handler.menuanime = ['waifu']
handler.tagsanime = ['anime']
handler.command = /^(waifu)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default handler