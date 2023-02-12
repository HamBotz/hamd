const all = ['help', ...['anime','download','ephoto','editor','fun','genshin','group','nsfw','owner','oxy','store','textpro'].map(v => 'menu' + v)]

let handler = async (m) => {
	let count = 0
	let txt = `*[ FRACTION LIST ]*\n`
	for (let x of all) {
		let cmd = Object.values(plugins).filter(v => v[x] && !v.disabled).map(v => v[x]).flat().length
		count += cmd
		txt += `\n*⭔ ${x == 'help' ? 'Main Menu' : x} :* ${cmd} fitur`
	}
	txt += `\n\n*Total Fitur : ${count} Commands*`
	await m.reply(txt.replace(/menu/g, ''))
}

handler.help = ['totalfitur']
handler.tags = ['tools']
handler.command = /^(ft|total(ft?|fitur|cmd|command))$/i

export default handler