let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|secret|Halo.`
    let [jid, name, pesan] = text.split('|')
    if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|secret|Halo.`
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let data = (await conn.onWhatsApp(jid))[0] || {}
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.'
    if (jid == m.sender) throw 'tidak bisa mengirim pesan menfess ke diri sendiri.'
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    try {
    	let id = + new Date
        let txt = `Hai @${data.jid.split('@')[0]}, kamu menerima pesan Menfess nih.\n\nDari: *${name}*\n\nPesan: \n${pesan}\n\nMau balas pesan ini kak?\nKakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*.`.trim()
        await conn.sendButton(data.jid, txt, author, null, [['Balas Pesan', '_menfess']], null, { mentions: conn.parseMention(txt) })
        .then(() => {
            m.reply('Berhasil mengirim pesan menfess.')
            conn.menfess[id] = {
                id,
                dari: m.sender,
                nama: name,
                penerima: data.jid,
                pesan: pesan,
                status: false
            }
            return !0
        })
    } catch (e) {
        console.log(e)
        throw e 
    }
}

handler.menugroup = ['menfess nomor|pesan']
handler.tagsgroup = ['group']
handler.private = true

handler.command = /^(menfess|confess|menfes|confes)$/i
export default handler