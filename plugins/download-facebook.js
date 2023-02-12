import { snapsave } from '@bochilteam/scraper'

let handler = async (m, { conn, args }) => {
	if (!args[0]) throw 'Input URL'
	let res = await snapsave(args[0])
	if (!res) throw 'Can\'t download the post'
	let url = res?.url?.[0]?.url || res?.url?.[1]?.url || res?.['720p'] || res?.['360p']
	await m.reply('_In progress, please wait..._')
	conn.sendMessage(m.chat, { video: { url }, caption: res?.meta?.title || '' }, { quoted: m })
}
handler.menudownload = ['facebook <url>']
handler.tagsdwonload = ['search']

handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler