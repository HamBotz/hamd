let handler = async (m, { conn, command }) => {
    conn.reply(m.chat, `*「 RECODED BY HAM 」*

*Original Base From :*
_https://github.com/BochilGaming_
`, m)
}

handler.command = /^(sc|sourcecode)$/i

export default handler