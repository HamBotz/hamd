let handler = async (m, { conn, usedPrefix, command }) => {
	let p = `simple aja mau donasi kan?\n087729860010 nih nomer nya \ndonate pulsa,dana selain itu ga menerima 
	`
	await m.reply(p)
}

handler.command = /^(dona(te|si))$/i

export default handler