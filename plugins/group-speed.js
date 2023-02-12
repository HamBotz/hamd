import { cpus as _cpus, totalmem, freemem } from 'os'
import os from 'os'
import fs from 'fs'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import { runtime } from '../lib/others.js'

let format = sizeFormatter({
	std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn }) => {
	let groups
	try { groups = Object.values(await conn.groupFetchAllParticipating()) }
	catch { return }
	let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
	let groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
	let used = process.memoryUsage()
	const cpus = _cpus().map(cpu => {
		cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
		return cpu
	  })
	  const cpu = cpus.reduce((last, cpu, _, { length }) => {
		last.total += cpu.total
		last.speed += cpu.speed / length
		last.times.user += cpu.times.user
		last.times.nice += cpu.times.nice
		last.times.sys += cpu.times.sys
		last.times.idle += cpu.times.idle
		last.times.irq += cpu.times.irq
		return last
	  }, {
		speed: 0,
		total: 0,
		times: {
		  user: 0,
		  nice: 0,
		  sys: 0,
		  idle: 0,
		  irq: 0
		}
	  })
	  let old = performance.now()
	let session = fs.statSync(authFile)
	let neww = performance.now()
    let speed = neww - old
    m.reply(`Kecepatan Respon ${speed.toFixed(4)} detik

Runtime :\n*${runtime(process.uptime())}*
OS Uptime :\n*${runtime(os.uptime())}*

💬 Status :
- *${groupsIn.length}* Group Chats
- *${groupsIn.length}* Groups Joined
- *${groupsIn.length - groupsIn.length}* Groups Left
- *${chats.length - groupsIn.length}* Personal Chats
- *${chats.length}* Total Chats

💻 *Server Info* :
RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}
FREE RAM: ${format(freemem())}
SESSION SIZE: ${format(session.size)}
PLATFORM: ${os.platform()}
SERVER: ${os.hostname()}

_NodeJS Memory Usage_
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}
${cpus[0] ? `

_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim())
}

handler.menugroup = ['ping']
handler.tagsgroup = ['group']
handler.command = /^(p(i|o)ng|tes|test|info|ingfo|runtime)$/i

export default handler