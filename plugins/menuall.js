import db from '../lib/database.js'
import { readMore, ranNumb, padLead, runtimes } from '../lib/others.js'
import { promises } from 'fs'
import { join } from 'path'
import fs from 'fs'
import got from 'got'
import os from 'os'

let tags = {
	'submenu': 'πͺ *SUB MENU*',
	'searching': 'π *SEARCHING*',
	'randomtext': 'β»οΈ *RANDOM TEXT*',
	'information': 'π€ *INFORMATION*',
	'entertainment': 'π‘ *ENTERTAINMENT*',
	'primbon': 'π *PRIMBON*',
	'creator': 'π±π» *CREATOR*',
	'tools': 'βοΈ *TOOLS MENU*',
}
const defaultMenu = {
	before: `
ββββ *γ %me γ* 
β
ββ§ βΈ¨ *.owner* βΈ©
ββ§ βΈ¨ *.info* βΈ©
ββ§ βΈ¨ *.levelup* βΈ©
β ββββββββββββββββββ
ββ§ π Runtime : *%uptime*
ββ§ π OS Uptime : *%osuptime*
ββββββββββββββββββββββ

β­βββγ *PROFILMU* γ
β β’ Nama  : %name!
β β’ Role : *%role*
β β’ Limit : *%limit*
β°βββββββββββββ %readmore`.trimStart(),
	header: 'β­βγ %category γ',
	body: 'β β’ %cmd',
	footer: 'β°ββββ\n',
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, isPrems }) => {
	try {
		let meh = padLead(ranNumb(43), 3)
		let nais = await got('https://raw.githubusercontent.com/clicknetcafe/Databasee/main/azamibot/menus.json').json().then(v => v.getRandom())
		let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
		let { limit, role } = db.data.users[m.sender]
		let name = await conn.getName(m.sender).replaceAll('\n','')
		let uptime = runtimes(process.uptime())
		let osuptime = runtimes(os.uptime())
		let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
			return {
				help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
				tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
				prefix: 'customPrefix' in plugin,
				limit: plugin.limit,
				premium: plugin.premium,
				enabled: !plugin.disabled,
			}
		})
		for (let plugin of help)
			if (plugin && 'tags' in plugin)
				for (let tag of plugin.tags)
					if (!(tag in tags) && tag) tags[tag] = tag
		conn.menu = conn.menu ? conn.menu : {}
		let before = conn.menu.before || defaultMenu.before
		let header = conn.menu.header || defaultMenu.header
		let body = conn.menu.body || defaultMenu.body
		let footer = conn.menu.footer || defaultMenu.footer
		let _text = [
			before.replace(': *%limit', `${isPrems ? ': *Infinity' : ': *%limit'}`),
			...Object.keys(tags).map(tag => {
				return header.replace(/%category/g, tags[tag]) + '\n' + [
					...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
						return menu.help.map(help => {
							return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
								.replace(/%islimit/g, menu.limit ? '(Limit)' : '')
								.replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
								.trim()
						}).join('\n')
					}),
					footer
				].join('\n')
			}),
		].join('\n')
		let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
		let replace = {
			'%': '%',
			p: _p, uptime, osuptime,
			me: conn.getName(conn.user.jid),
			github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
			limit, name, role,
			readmore: readMore
		}
		text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
		const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
		conn.sendButton(m.chat, text.trim(), pauthor, nais, [
			[`π₯ Owner`, `.owner`],
			[`π Prem`, `.premium`]
		], m, { asLocation: true })
	} catch (e) {
		throw e
	}
}

handler.command = /^(helpall|allhelp|allm(enu)?|m(enu)?all|\?)$/i

handler.exp = 3

export default handler