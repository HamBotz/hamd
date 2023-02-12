let handler = m => m
handler.before = async function (m) {
	if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
	this.menfess = this.menfess ? this.menfess : {}
	let mf = Object.values(this.menfess).find(v => v.status === false && v.penerima == m.sender)
	if (!mf) return !0
	console.log(m)
	if (m.text === 'Balas Pesan' && m.quoted.mtype == 'buttonsMessage') return this.reply(`Silahkan kirim pesan balasan kamu.`)
	let txt = `Hai kak @${mf.dari.split('@')[0]}, kamu menerima balasan nih.\n\nPesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n`.trim();
	await this.reply(mf.dari, txt, null, { mentions: [mf.dari] }).then(() => {
		m.reply('Berhasil mengirim balasan.')
		this.delay(5000)
		delete this.menfess[mf.id]
		return !0
	})
}

handler.exp = 0

export default handler