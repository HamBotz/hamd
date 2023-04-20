import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import fs, { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import Helper from './lib/helper.js'
import db, { loadDatabase } from './lib/database.js'
import fetch from 'node-fetch'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * @type {import('@adiwajshing/baileys')}
 */
const { proto } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
	clearTimeout(this)
	resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
	this.msgqueque = this.msgqueque || []
	if (!chatUpdate)
		return
	this.pushMessage(chatUpdate.messages).catch(console.error)
	let m = chatUpdate.messages[chatUpdate.messages.length - 1]
	if (!m)
		return
	if (m.message?.viewOnceMessageV2) m.message = m.message.viewOnceMessageV2.message
	if (m.message?.documentWithCaptionMessage) m.message = m.message.documentWithCaptionMessage.message
	if (db.data == null)
		await loadDatabase()
	try {
		m = smsg(this, m) || m
		if (!m)
			return
		m.exp = 0
		m.limit = false
		try {
			// TODO: use loop to insert data instead of this
			let user = db.data.users[m.sender]
			if (m.sender.endsWith('@s.whatsapp.net')) {
				if (typeof user !== 'object')
				db.data.users[m.sender] = {}
				if (user) {
					if (!isNumber(user.exp))
						user.exp = 0
					if (!isNumber(user.limit))
						user.limit = 50
					if (!isNumber(user.lastclaim))
						user.lastclaim = 0
					if (!('registered' in user))
						user.registered = false
					if (!('viewstatus' in user))
						user.viewstatus = false
					if (!user.registered) {
						if (!('name' in user))
							user.name = m.name
						if (!isNumber(user.age))
							user.age = -1
						if (!isNumber(user.regTime))
							user.regTime = -1
					}
					if (!isNumber(user.afk))
						user.afk = -1
					if (!('afkReason' in user))
						user.afkReason = ''
					if (!('banned' in user))
						user.banned = false
					if (!('permaban' in user))
						user.permaban = false
					if (!isNumber(user.lastbanned))
						user.lastbanned = 0
					if (!isNumber(user.bannedcd))
						user.bannedcd = 0
					if (!isNumber(user.warn))
						user.warn = 0
					if (!isNumber(user.level))
						user.level = 0
					if (!('role' in user))
						user.role = 'Beginner'
					if (!('autolevelup' in user))
						user.autolevelup = true

					if (!isNumber(user.money))
						user.money = 0
					if (!isNumber(user.atm))
						user.atm = 0
					if (!isNumber(user.health))
						user.health = 100
					if (!isNumber(user.potion))
						user.potion = 0
					if (!isNumber(user.trash))
						user.trash = 0
					if (!isNumber(user.wood))
						user.wood = 0
					if (!isNumber(user.rock))
						user.rock = 0
					if (!isNumber(user.string))
						user.string = 0
					if (!isNumber(user.iron))
						user.iron = 0
					if (!isNumber(user.sand))
						user.sand = 0

					if (!isNumber(user.emerald))
						user.emerald = 0
					if (!isNumber(user.diamond))
						user.diamond = 0
					if (!isNumber(user.gold))
						user.gold = 0
					if (!isNumber(user.steel))
						user.steel = 0
					if (!isNumber(user.kargo))
						user.kargo = 0
					if (!isNumber(user.kapal))
						user.kapal = 0

					if (!isNumber(user.common))
						user.common = 0
					if (!isNumber(user.commoncount))
						user.commoncount = 0
					if (!isNumber(user.uncommon))
						user.uncommon = 0
					if (!isNumber(user.uncommoncount))
						user.uncommoncount = 0
					if (!isNumber(user.mythic))
						user.mythic = 0
					if (!isNumber(user.mythiccount))
						user.mythiccount = 0
					if (!isNumber(user.legendary))
						user.legendary = 0
					if (!isNumber(user.legendarycount))
						user.legendarycount = 0
					if (!isNumber(user.pet))
						user.pet = 0
					if (!isNumber(user.petcount))
						user.petcount = 0
					if (!isNumber(user.petfood))
						user.petfood = 0

					if (!isNumber(user.horse))
						user.horse = 0
					if (!isNumber(user.horseexp))
						user.horseexp = 0
					if (!isNumber(user.cat))
						user.cat = 0
					if (!isNumber(user.catexp))
						user.catexp = 0
					if (!isNumber(user.fox))
						user.fox = 0
					if (!isNumber(user.foxexp))
						user.foxexp = 0
					if (!isNumber(user.dog))
						user.dog = 0
					if (!isNumber(user.dogexp))
						user.dogexp = 0
					if (!isNumber(user.wolf))
						user.wolf = 0
					if (!isNumber(user.wolfexp))
						user.wolfexp = 0
					if (!isNumber(user.centaur))
						user.centaur = 0
					if (!isNumber(user.centaurexp))
						user.centaurexp = 0
					if (!isNumber(user.phoenix))
						user.phoenix = 0
					if (!isNumber(user.phoenixexp))
						user.phoenixexp = 0
					if (!isNumber(user.dragon))
						user.dragon = 0
					if (!isNumber(user.dragonexp))
						user.dragonexp = 0
					if (!isNumber(user.horselvl))
						user.horselvl = 0
					if (!isNumber(user.catlvl))
						user.catlvl = 0
					if (!isNumber(user.foxlvl))
						user.foxlvl = 0
					if (!isNumber(user.doglvl))
						user.doglvl = 0
					if (!isNumber(user.wolflvl))
						user.wolflvl = 0
					if (!isNumber(user.centaurlvl))
						user.centaurlvl = 0
					if (!isNumber(user.phoenixlvl))
						user.phoenixlvl = 0
					if (!isNumber(user.dragonlvl))
						user.dragonlvl = 0
					if (!isNumber(user.horsehealth))
						user.horsehealth = 0
					if (!isNumber(user.cathealth))
						user.cathealth = 0
					if (!isNumber(user.foxhealth))
						user.foxhealth = 0
					if (!isNumber(user.doghealth))
						user.doghealth = 0
					if (!isNumber(user.wolfhealth))
						user.wolfhealth = 0
					if (!isNumber(user.centaurhealth))
						user.centaurhealth = 0
					if (!isNumber(user.phoenixhealth))
						user.phoenixhealth = 0
					if (!isNumber(user.dragonhealth))
						user.dragonhealth = 0

					if (!isNumber(user.horselastfeed))
						user.horselastfeed = 0
					if (!isNumber(user.catlastfeed))
						user.catlastfeed = 0
					if (!isNumber(user.foxlastfeed))
						user.foxlastfeed = 0
					if (!isNumber(user.doglastfeed))
						user.doglastfeed = 0
					if (!isNumber(user.wolflastfeed))
						user.wolflastfeed = 0
					if (!isNumber(user.centaurlastfeed))
						user.centaurlastfeed = 0
					if (!isNumber(user.phoenixlastfeed))
						user.phoenixlastfeed = 0
					if (!isNumber(user.dragonlastfeed))
						user.dragonlastfeed = 0
					if (!isNumber(user.lastadu))
						user.lastadu = 0

					if (!isNumber(user.armor))
						user.armor = 0
					if (!isNumber(user.armordurability))
						user.armordurability = 0
					if (!isNumber(user.sword))
						user.sword = 0
					if (!isNumber(user.sworddurability))
						user.sworddurability = 0
					if (!isNumber(user.pickaxe))
						user.pickaxe = 0
					if (!isNumber(user.pickaxedurability))
						user.pickaxedurability = 0
					if (!isNumber(user.fishingrod))
						user.fishingrod = 0
					if (!isNumber(user.fishingroddurability))
						user.fishingroddurability = 0
					if (!isNumber(user.bow))
						user.bow = 0
					if (!isNumber(user.bowdurability))
						user.bowdurability = 0

					if (!isNumber(user.lastclaim))
						user.lastclaim = 0
					if (!isNumber(user.lastadventure))
						user.lastadventure = 0
					if (!isNumber(user.lastfishing))
						user.lastfishing = 0
					if (!isNumber(user.lastdungeon))
						user.lastdungeon = 0
					if (!isNumber(user.lastduel))
						user.lastduel = 0
					if (!isNumber(user.lastmining))
						user.lastmining = 0
					if (!isNumber(user.lasthunt))
						user.lasthunt = 0
					if (!isNumber(user.lastlumber))
						user.lastlumber = 0
					if (!isNumber(user.lastngojek))
						user.lastngojek = 0
					if (!isNumber(user.lastweekly))
						user.lastweekly = 0
					if (!isNumber(user.lastmonthly))
						user.lastmonthly = 0
					if (!isNumber(user.lastbansos))
						user.lastbansos = 0
					if (!isNumber(user.lastdagang))
						user.lastdagang = 0
					if (!isNumber(user.lastberkebon))
						user.lastberkebon = 0
					if (!isNumber(user.lastmasak))
						user.lastmasak = 0
					if (!isNumber(user.masakcount))
						user.masakcount = 0
					if (!isNumber(user.craftcount))
						user.craftcount = 0
					if (!isNumber(user.adventurecount))
						user.adventurecount = 0
					if (!isNumber(user.mancingcount))
						user.mancingcount = 0
					if (!isNumber(user.lumbercount))
						user.lumbercount = 0
					if (!isNumber(user.ngojekcount))
						user.ngojekcount = 0

					if (!isNumber(user.bibitmangga))
						user.bibitmangga = 0
					if (!isNumber(user.bibitapel))
						user.bibitapel = 0
					if (!isNumber(user.bibitpisang))
						user.bibitpisang = 0
					if (!isNumber(user.bibitjeruk))
						user.bibitjeruk = 0
					if (!isNumber(user.bibitanggur))
						user.bibitanggur = 0
					if (!isNumber(user.mangga))
						user.mangga = 0
					if (!isNumber(user.apel))
						user.apel = 0
					if (!isNumber(user.pisang))
						user.pisang = 0
					if (!isNumber(user.jeruk))
						user.jeruk = 0
					if (!isNumber(user.anggur))
						user.anggur = 0

					if (!isNumber(user.banteng))
						user.banteng = 0
					if (!isNumber(user.harimau))
						user.harimau = 0
					if (!isNumber(user.gajah))
						user.gajah = 0
					if (!isNumber(user.kambing))
						user.kambing = 0
					if (!isNumber(user.panda))
						user.panda = 0
					if (!isNumber(user.buaya))
						user.buaya = 0
					if (!isNumber(user.kerbau))
						user.kerbau = 0
					if (!isNumber(user.sapi))
						user.sapi = 0
					if (!isNumber(user.monyet))
						user.monyet = 0
					if (!isNumber(user.babihutan))
						user.babihutan = 0
					if (!isNumber(user.babi))
						user.babi = 0
					if (!isNumber(user.ayam))
						user.ayam = 0

					if (!isNumber(user.orca))
						user.orca = 0
					if (!isNumber(user.paus))
						user.paus = 0
					if (!isNumber(user.lumba))
						user.lumba = 0
					if (!isNumber(user.hiu))
						user.hiu = 0
					if (!isNumber(user.ikan))
						user.ikan = 0
					if (!isNumber(user.lele))
						user.lele = 0
					if (!isNumber(user.bawal))
						user.bawal = 0
					if (!isNumber(user.nila))
						user.nila = 0
					if (!isNumber(user.kepiting))
						user.kepiting = 0
					if (!isNumber(user.lobster))
						user.lobster = 0
					if (!isNumber(user.gurita))
						user.gurita = 0
					if (!isNumber(user.cumi))
						user.cumi = 0
					if (!isNumber(user.udang))
						user.udang = 0

					if (!isNumber(user.masak))
						user.masak = 0
					if (!isNumber(user.masakrole))
						user.masakrole = 0
					if (!isNumber(user.masakexp))
						user.masakexp = 0
					if (!isNumber(user.masaklevel))
						user.masaklevel = 0

					if (!isNumber(user.bawang))
						user.bawang = 0
					if (!isNumber(user.cabai))
						user.cabai = 0
					if (!isNumber(user.kemiri))
						user.kemiri = 0
					if (!isNumber(user.jahe))
						user.jahe = 0
					if (!isNumber(user.saus))
						user.saus = 0
					if (!isNumber(user.asam))
						user.asam = 0

					if (!isNumber(user.steak))
						user.steak = 0
					if (!isNumber(user.sate))
						user.sate = 0
					if (!isNumber(user.rendang))
						user.rendang = 0
					if (!isNumber(user.kornet))
						user.kornet = 0
					if (!isNumber(user.nugget))
						user.nugget = 0
					if (!isNumber(user.bluefin))
						user.bluefin = 0
					if (!isNumber(user.seafood))
						user.seafood = 0
					if (!isNumber(user.sushi))
						user.sushi = 0
					if (!isNumber(user.moluska))
						user.moluska = 0
					if (!isNumber(user.squidprawm))
						user.squidprawm = 0

					if (!isNumber(user.rumahsakit))
						user.rumahsakit = 0
					if (!isNumber(user.restoran))
						user.restoran = 0
					if (!isNumber(user.pabrik))
						user.pabrik = 0
					if (!isNumber(user.tambang))
						user.tambang = 0
					if (!isNumber(user.pelabuhan))
						user.pelabuhan = 0
					if (!('rumahsakitname' in user))
						user.rumahsakitname = ''
					if (!('restoranname' in user))
						user.restoranname = ''
					if (!('pabrikname' in user))
						user.pabrikname = ''
					if (!('tambangname' in user))
						user.tambangname = ''
					if (!('pelabuhanname' in user))
						user.pelabuhanname = ''
					if (!('openaitxt' in user))
						user.openaitxt = ''
					if (!isNumber(user.rumahsakitexp))
						user.rumahsakitexp = 0
					if (!isNumber(user.restoranexp))
						user.restoranexp = 0
					if (!isNumber(user.pabrikexp))
						user.pabrikexp = 0
					if (!isNumber(user.tambangexp))
						user.tambangexp = 0
					if (!isNumber(user.pelabuhanexp))
						user.pelabuhanexp = 0
					if (!isNumber(user.rumahsakitlvl))
						user.rumahsakitlvl = 0
					if (!isNumber(user.restoranlvl))
						user.restoranlvl = 0
					if (!isNumber(user.pabriklvl))
						user.pabriklvl = 0
					if (!isNumber(user.tambanglvl))
						user.tambanglvl = 0
					if (!isNumber(user.pelabuhanlvl))
						user.pelabuhanlvl = 0
					if (!isNumber(user.expired))
						user.expired = 0
					if (!isNumber(user.spamcount))
						user.spamcount = 0
				} else db.data.users[m.sender] = {
					exp: 0,
					limit: 50,
					lastclaim: 0,
					registered: false,
					viewstatus: false,
					name: m.name,
					age: -1,
					regTime: -1,
					afk: -1,
					afkReason: '',
					banned: false,
					permaban: false,
					lastbanned: 0,
					bannedcd: 0,
					warn: 0,
					level: 0,
					role: 'Beginner',
					autolevelup: true,

					money: 0,
					atm: 0,
					health: 100,
					potion: 10,
					trash: 0,
					wood: 0,
					rock: 0,
					string: 0,
					iron: 0,
					sand: 0,

					emerald: 0,
					diamond: 0,
					gold: 0,
					steel: 0,
					kargo: 0,
					kapal: 0,

					common: 0,
					commoncount: 0,
					uncommon: 0,
					uncommoncount: 0,
					mythic: 0,
					mythiccount: 0,
					legendary: 0,
					legendarycount: 0,
					pet: 0,
					petcount: 0,
					petfood: 0,

					horse: 0,
					horseexp: 0,
					cat: 0,
					catexp: 0,
					fox: 0,
					foxexp: 0,
					dog: 0,
					dogexp: 0,
					wolf: 0,
					wolfexp: 0,
					centaur: 0,
					centaurexp: 0,
					phoenix: 0,
					phoenixexp: 0,
					dragon: 0,
					dragonexp: 0,
					horselvl: 0,
					catlvl: 0,
					foxlvl: 0,
					doglvl: 0,
					wolflvl: 0,
					centaurlvl: 0,
					phoenixlvl: 0,
					dragonlvl: 0,
					horsehealth: 0,
					cathealth: 0,
					foxhealth: 0,
					doghealth: 0,
					wolfhealth: 0,
					centaurhealth: 0,
					phoenixhealth: 0,
					dragonhealth: 0,

					horselastfeed: 0,
					catlastfeed: 0,
					foxlastfeed: 0,
					doglastfeed: 0,
					wolflastfeed: 0,
					centaurlastfeed: 0,
					phoenixlastfeed: 0,
					dragonlastfeed: 0,
					lastadu: 0,

					armor: 0,
					armordurability: 0,
					sword: 0,
					sworddurability: 0,
					pickaxe: 0,
					pickaxedurability: 0,
					fishingrod: 0,
					fishingroddurability: 0,
					bow: 0,
					bowdurability: 0,

					lastclaim: 0,
					lastadventure: 0,
					lastfishing: 0,
					lastdungeon: 0,
					lastduel: 0,
					lastmining: 0,
					lasthunt: 0,
					lastlumber: 0,
					lastngojek: 0,
					lastweekly: 0,
					lastmonthly: 0,
					lastbansos: 0,
					lastdagang: 0,
					lastberkebon: 0,
					lastmasak: 0,
					masakcount: 0,
					craftcount: 0,
					adventurecount: 0,
					mancingcount: 0,
					lumbercount: 0,
					ngojekcount: 0,

					bibitmangga: 0,
					bibitapel: 0,
					bibitpisang: 0,
					bibitjeruk: 0,
					bibitanggur: 0,
					mangga: 0,
					apel: 0,
					pisang: 0,
					jeruk: 0,
					anggur: 0,

					banteng: 0,
					harimau: 0,
					gajah: 0,
					panda: 0,
					kambing: 0,
					buaya: 0,
					kerbau: 0,
					sapi: 0,
					monyet: 0,
					babihutan: 0,
					babi: 0,
					ayam: 0,

					orca: 0,
					paus: 0,
					lumba: 0,
					hiu: 0,
					ikan: 0,
					lele: 0,
					bawal: 0,
					nila: 0,
					kepiting: 0,
					lobster: 0,
					gurita: 0,
					cumi: 0,
					udang: 0,

					masak: 0,
					masakrole: 0,
					masakexp: 0,
					masaklevel: 0,

					bawang: 0,
					cabai: 0,
					kemiri: 0,
					jahe: 0,
					saus: 0,
					asam: 0,

					steak: 0,
					sate: 0,
					rendang: 0,
					kornet: 0,
					nugget: 0,
					bluefin: 0,
					seafood: 0,
					sushi: 0,
					moluska: 0,
					squidprawm: 0,

					rumahsakit: 0,
					restoran: 0,
					pabrik: 0,
					tambang: 0,
					pelabuhan: 0,
					rumahsakitname: '',
					restoranname: '',
					pabrikname: '',
					tambangname: '',
					pelabuhanname: '',
					openaitxt: '',
					rumahsakitexp: 0,
					restoranexp: 0,
					pabrikexp: 0,
					tambangexp: 0,
					pelabuhanexp: 0,
					rumahsakitlvl: 0,
					restoranlvl: 0,
					pabriklvl: 0,
					tambanglvl: 0,
					pelabuhanlvl: 0,
					expired: 0,
					spamcount: 0,
				}
			}
			let chat = db.data.chats[m.chat]
			if (m.chat.endsWith('@g.us')) {
				if (typeof chat !== 'object')
					db.data.chats[m.chat] = {}
				if (chat) {
					if (!('isBanned' in chat))
						chat.isBanned = false
					if (!('permaBan' in chat))
						chat.permaBan = false
					if (!('welcome' in chat))
						chat.welcome = false
					if (!('detect' in chat))
						chat.detect = false
					if (!('sWelcome' in chat))
						chat.sWelcome = ''
					if (!('sBye' in chat))
						chat.sBye = ''
					if (!('sPromote' in chat))
						chat.sPromote = ''
					if (!('sDemote' in chat))
						chat.sDemote = ''
					if (!('openaitxt' in chat))
						chat.openaitxt = ''
					if (!('delete' in chat))
						chat.delete = true
					if (!('antiLink' in chat))
						chat.antiLink = false
					if (!('antivirus' in chat))
						chat.antivirus = false
					if (!('nsfw' in chat))
						chat.nsfw = false
					if (!('infogempa' in chat))
						chat.infogempa = false
					if (!('pdf' in chat))
						chat.pdf = false
					if (!('game' in chat))
						chat.game = true
					if (!('openai' in chat))
						chat.openai = false
					if (!('simi' in chat))
						chat.simi = false
					if (!('lastsimi' in chat))
						chat.lastsimi = false
					if (!('viewonce' in chat))
						chat.viewonce = false
					if (!('antiToxic' in chat))
						chat.antiToxic = false
					if (!isNumber(chat.joindate))
						chat.joindate = 0
					if (!isNumber(chat.joincd))
						chat.joincd = 0
					if (!isNumber(chat.expired))
						chat.expired = 0
					if (!isNumber(chat.lastmute))
						chat.lastmute = 0
					if (!isNumber(chat.mutecd))
						chat.mutecd = 0
					if (!isNumber(chat.spamcount))
						chat.spamcount = 0
				} else db.data.chats[m.chat] = {
					isBanned: false,
					permaBan: false,
					welcome: false,
					detect: false,
					sWelcome: '',
					sBye: '',
					sPromote: '',
					sDemote: '',
					openaitxt: '',
					delete: true,
					antiLink: false,
					antivirus: false,
					nsfw: false,
					infogempa: false,
					pdf: false,
					game: true,
					openai: false,
					simi: false,
					lastsimi: false,
					viewonce: false,
					antiToxic: true,
					joindate: 0,
					joincd: 0,
					expired: 0,
					lastmute: 0,
					mutecd: 0,
					spamcount: 0,
				}
			}
			let akinator = db.data.users[m.sender].akinator
			if (typeof akinator !== 'object')
				db.data.users[m.sender].akinator = {}
			if (akinator) {
				if (!('sesi' in akinator))
					akinator.sesi = false
				if (!('server' in akinator))
					akinator.server = null
				if (!('frontaddr' in akinator))
					akinator.frontaddr = null
				if (!('session' in akinator))
					akinator.session = null
				if (!('signature' in akinator))
					akinator.signature = null
				if (!('question' in akinator))
					akinator.question = null
				if (!('progression' in akinator))
					akinator.progression = null
				if (!('step' in akinator))
					akinator.step = null
				if (!('soal' in akinator))
					akinator.soal = null
			} else
				db.data.users[m.sender].akinator = {
					sesi: false,
					server: null,
					frontaddr: null,
					session: null,
					signature: null,
					question: null,
					progression: null,
					step: null, 
					soal: null
				}
			let settings = db.data.settings[this.user.jid]
			if (typeof settings !== 'object') db.data.settings[this.user.jid] = {}
			if (settings) {
				if (!('self' in settings)) settings.self = false
				if (!('autoread' in settings)) settings.autoread = false
				if (!('restrict' in settings)) settings.restrict = false
			} else db.data.settings[this.user.jid] = {
				self: false,
				autoread: false,
				restrict: false,
			}
			let datas = db.data.datas
			if (typeof datas !== 'object') db.data.datas = {}
			if (datas) {
				if (!('packname' in datas)) datas.packname = 'HamBotz-md'
				if (!('author' in datas)) datas.author = 'by ham'
				if (!('linkgc' in datas)) datas.linkgc = 'https://chat.whatsapp.com/E00H4H5B83jFOmlV8DVO94'
				if (!('teksdonasi' in datas)) datas.teksdonasi = ''
				if (!('tekssewa' in datas)) datas.tekssewa = ''
				if (!('teksjadibot' in datas)) datas.teksjadibot = ''
				if (!('tekstopup' in datas)) datas.tekstopup = ''
				if (!('linkgc' in datas)) datas.linkgc = ''
				if (!('api' in datas)) datas.api = ''
				if (!('imgbb' in datas)) datas.imgbb = ''
				if (!('wgempa' in datas)) datas.wgempa = ''
				if (!('spamcountreset' in datas)) datas.spamcountreset = 0
				if (!('spamcountgcreset' in datas)) datas.spamcountgcreset = 0
				if (!('spamlistmsg' in datas)) datas.spamlistmsg = null
				if (!('spamlistgcmsg' in datas)) datas.spamlistgcmsg = null
				if (!('openaipc' in datas)) datas.openaipc = false
				if (!('prems' in datas)) datas.prems = [{user: '', date: 0}]
				if (!('rowner' in datas)) datas.rowner = [[
						"6287729860010",
						"ham",
						true
					]]
				if (!('owner' in datas)) datas.owner = []
				if (!('store' in datas)) datas.store = []
				if (!('storestatus' in datas)) datas.storestatus = {}
				if (!('menfess' in datas)) datas.menfess = {}
				if (!('listgc' in datas)) datas.listgc = []
				if (!('openaikey' in datas)) datas.openaikey = []
				if (!('menfesschat' in datas)) datas.menfesschat = {}
				if (!('menfesschatcd' in datas)) datas.menfesschatcd = 0
			} else db.data.datas = {
				packname: 'HamBotz-md',
				author: 'by ham',
				linkgc: 'https://chat.whatsapp.com/E00H4H5B83jFOmlV8DVO94',
				api: '',
				imgbb: '',
				wgempa: '',
				spamcountreset: 0,
				spamcountgcreset: 0,
				spamlistmsg: null,
				spamlistgcmsg: null,
				openaikey: '',
				openaipc: false,
				teksdonasi: '',
				tekssewa: '',
				teksjadibot: '',
				tekstopup: '',
				prems: [{user: '', date: 0}],
				rowner: [[
						"6287729860010",
						"ham",
						true
					]],
				owner: [],
				store: [],
				storestatus: {},
				menfess: {},
				listgc: [],
				openaikey: [],
				menfesschat: {},
				menfesschatcd: 0,
			}
		} catch (e) {
			console.error(e)
		}

		const isMods = global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isROwner = isMods || [conn.decodeJid(global.conn.user.id), ...db.data.datas.rowner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isOwner = isROwner || m.fromMe || db.data.datas.owner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isPrems = isOwner || db.data.datas.prems.map(v => v.user).includes(m.sender)

		if (opts['nyimak'])
			return
		if (!isROwner && opts['self'])
			return
		if (opts['pconly'] && m.chat.endsWith('g.us'))
			return
		if (opts['gconly'] && !m.chat.endsWith('g.us') && !isPrems)
			return
		if (opts['swonly'] && m.chat !== 'status@broadcast')
			return
		if (typeof m.text !== 'string')
			m.text = ''

		if (opts['queque'] && m.text && !(isMods || isPrems)) {
			let queque = this.msgqueque, time = 1000 * 5
			const previousID = queque[queque.length - 1]
			queque.push(m.id || m.key.id)
			setInterval(async function () {
				if (queque.indexOf(previousID) === -1) clearInterval(this)
				await delay(time)
			}, time)
		}

		if (m.isBaileys && m.fromMe)
			return
		m.exp += Math.ceil(Math.random() * 10)

		let usedPrefix
		let _user = db.data && db.data.users && db.data.users[m.sender]

		const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
		const participants = (m.isGroup ? groupMetadata.participants : []) || []
		const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
		const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
		const isRAdmin = user?.admin == 'superadmin' || false
		const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
		const isBotAdmin = bot?.admin || false // Are you Admin?

		const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
		for (let name in global.plugins) {
			let plugin = global.plugins[name]
			if (!plugin)
				continue
			if (plugin.disabled)
				continue
			const __filename = join(___dirname, name)
			if (typeof plugin.all === 'function') {
				try {
					await plugin.all.call(this, m, {
						chatUpdate,
						__dirname: ___dirname,
						__filename
					})
				} catch (e) {
					console.error(e)
					if (db.data.datas.rowner.length > 0) {
						for (let [jid] of db.data.datas.rowner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
							let data = (await conn.onWhatsApp(jid))[0] || {}
							if (data.exists)
								m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
						}
					}
				}
			}
			if (!opts['restrict'])
				if (plugin.tags && plugin.tags.includes('admin')) {
					continue
				}
			const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
			let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
			let match = (_prefix instanceof RegExp ? // RegExp Mode?
				[[_prefix.exec(m.text), _prefix]] :
				Array.isArray(_prefix) ? // Array?
					_prefix.map(p => {
						let re = p instanceof RegExp ? // RegExp in Array?
							p :
							new RegExp(str2Regex(p))
						return [re.exec(m.text), re]
					}) :
					typeof _prefix === 'string' ? // String?
						[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
						[[[], new RegExp]]
			).find(p => p[1])
			if (typeof plugin.before === 'function') {
				if (await plugin.before.call(this, m, {
					match,
					conn: this,
					participants,
					groupMetadata,
					user,
					bot,
					isROwner,
					isOwner,
					isRAdmin,
					isAdmin,
					isBotAdmin,
					isPrems,
					chatUpdate,
					__dirname: ___dirname,
					__filename
				}))
					continue
			}
			if (typeof plugin !== 'function')
				continue
			if ((usedPrefix = (match[0] || '')[0])) {
				let noPrefix = m.text.replace(usedPrefix, '')
				let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
				args = args || []
				let _args = noPrefix.trim().split` `.slice(1)
				let text = _args.join` `
				command = (command || '').toLowerCase()
				let fail = plugin.fail || global.dfail // When failed
				let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
					plugin.command.test(command) :
					Array.isArray(plugin.command) ? // Array?
						plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
							cmd.test(command) :
							cmd === command
						) :
						typeof plugin.command === 'string' ? // String?
							plugin.command === command :
							false

				if (!isAccept)
					continue
				m.plugin = name
				if (m.chat in db.data.chats || m.sender in db.data.users) {
					let chat = db.data.chats[m.chat]
					let user = db.data.users[m.sender]
					if (name != 'owner-unbanchat.js' && chat?.isBanned)
						return // Except this
					if (name != 'owner-unbanuser.js' && user?.banned)
						return
				}
				if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
					fail('owner', m, this)
					continue
				}
				if (plugin.rowner && !isROwner) { // Real Owner
					fail('rowner', m, this)
					continue
				}
				if (plugin.owner && !isOwner) { // Number Owner
					fail('owner', m, this)
					continue
				}
				if (plugin.mods && !isMods) { // Moderator
					fail('mods', m, this)
					continue
				}
				if (plugin.premium && !isPrems && !m.isGroup) { // Premium
					fail('premium', m, this)
					continue
				}
				if (plugin.group && !m.isGroup) { // Group Only
					fail('group', m, this)
					continue
				} else if (plugin.botAdmin && !isBotAdmin) { // You Admin
					fail('botAdmin', m, this)
					continue
				} else if (plugin.admin && !isAdmin) { // User Admin
					fail('admin', m, this)
					continue
				}
				if (plugin.private && m.isGroup) { // Private Chat Only
					fail('private', m, this)
					continue
				}
				if (plugin.register == true && _user.registered == false) { // Butuh daftar?
					fail('unreg', m, this)
					continue
				}
				m.isCommand = true
				_user.spamcount += 1
				let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
				if (xp > 200)
					m.reply('Ngecit -_-') // Hehehe
				else
					m.exp += xp
				if (!isPrems && plugin.limit && db.data.users[m.sender].limit < plugin.limit * 1) {
					this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
					continue // Limit habis
				}
				if (plugin.level > _user.level) {
					this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
					continue // If the level has not been reached
				}
				let extra = {
					match,
					usedPrefix,
					noPrefix,
					_args,
					args,
					command,
					text,
					conn: this,
					participants,
					groupMetadata,
					user,
					bot,
					isROwner,
					isOwner,
					isRAdmin,
					isAdmin,
					isBotAdmin,
					isPrems,
					chatUpdate,
					__dirname: ___dirname,
					__filename
				}
				try {
					await plugin.call(this, m, extra)
					if (!isPrems)
						m.limit = m.limit || plugin.limit || false
				} catch (e) {
					m.error = e
					console.error(e)
					if (e) {
						let text = format(e)
						for (let key of Object.values(global.APIKeys))
							text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
						if (e.name)
							if (db.data.datas.rowner.length > 0) {
								for (let [jid] of db.data.datas.rowner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
									let data = (await conn.onWhatsApp(jid))[0] || {}
									if (data.exists)
										m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
								}
							}
						m.reply(text)
					}
				} finally {
					if (typeof plugin.after === 'function') {
						try {
							await plugin.after.call(this, m, extra)
						} catch (e) {
							console.error(e)
						}
					}
				}
				break
			}
		}
	} catch (e) {
		console.error(e)
	} finally {
		await this.sendPresenceUpdate(['composing', 'recording'].getRandom(), m.chat)
		if (opts['queque'] && m.text) {
			const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
			if (quequeIndex !== -1)
				this.msgqueque.splice(quequeIndex, 1)
		}
		let user, stats = db.data.stats
		if (m) {
			if (m.sender && (user = db.data.users[m.sender])) {
				user.exp += m.exp
				user.limit -= m.limit * 1
			}

			let stat
			if (m.plugin) {
				let now = +new Date
				if (m.plugin in stats) {
					stat = stats[m.plugin]
					if (!isNumber(stat.total))
						stat.total = 1
					if (!isNumber(stat.success))
						stat.success = m.error != null ? 0 : 1
					if (!isNumber(stat.last))
						stat.last = now
					if (!isNumber(stat.lastSuccess))
						stat.lastSuccess = m.error != null ? 0 : now
				} else
					stat = stats[m.plugin] = {
						total: 1,
						success: m.error != null ? 0 : 1,
						last: now,
						lastSuccess: m.error != null ? 0 : now
					}
				stat.total += 1
				stat.last = now
				if (m.error == null) {
					stat.success += 1
					stat.lastSuccess = now
				}
			}
		}

		try {
			if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
		} catch (e) {
			console.log(m, m.quoted, e)
		}
		if (opts['autoread'])
			await this.readMessages([m.key]).catch(() => { }) // WARNING : easy to get banned
	}
}

/**
 * Handle groups participants update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
	if (opts['self'])
		return
	// if (id in conn.chats) return // First login will spam
	if (this.isInit)
		return
	if (db.data == null)
		await loadDatabase()
	let chat = db.data.chats[id] || {}
	let text = ''
	switch (action) {
		case 'add':
		case 'remove':
			if (chat.welcome) {
				let add = /add/.test(action)
				let bufpp, image
				let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
				for (let user of participants) {
					let pp = './src/avatar_contact.png'
					try {
						try {
							try {
								bufpp = await this.profilePictureUrl(user, 'image')
							} catch {
								bufpp = 'https://i.ibb.co/m53WF9N/avatar-contact.png'
							}
							let bufppgc = await this.profilePictureUrl(id, 'image')
							let uname = await this.getName(user)
							let gname = await this.getName(id)
							try {
								const can = require('knights-canvas')
								image = await (add ? new can.Welcome() : new can.Goodbye()).setUsername(uname).setGuildName(gname).setGuildIcon(bufppgc).setMemberCount(groupMetadata.size).setAvatar(bufpp).setBackground('https://i.ibb.co/z2QQnqm/wp.jpg').toAttachment()
								pp = await image.toBuffer()
							} catch {
								image = await fetch(`https://api.lolhuman.xyz/api/base/${add ? 'welcome' : 'leave'}?apikey=${global.api}&img1=${bufpp}&img2=${bufppgc}&background=https://i.ibb.co/z2QQnqm/wp.jpg&username=${uname}&member=${groupMetadata.size}&groupname=${encodeURIComponent(gname)}`)
								pp = Buffer.from(await image.arrayBuffer())
							}
						} catch {
							pp = await this.profilePictureUrl(user, 'image')
						}
					} catch (e) {
					} finally {
						text = (add ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknow') :
							(chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
						this.sendFile(id, pp, 'pp.jpg', text, null, false, { mentions: [user] })
					}
				}
			}
			break
		case 'promote':
			text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
		case 'demote':
			if (!text)
				text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
			text = text.replace('@user', '@' + participants[0].split('@')[0])
			if (chat.detect)
				this.sendMessage(id, { text, mentions: this.parseMention(text) })
			break
	}
}

/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
	if (opts['self'])
		return
	for (const groupUpdate of groupsUpdate) {
		const id = groupUpdate.id
		if (!id) continue
		let chats = db.data.chats[id], text = ''
		if (!chats?.detect) continue
		if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
		if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
		if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
		if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
		if (!text) continue
		await this.sendMessage(id, { text, mentions: this.parseMention(text) })
	}
}

export async function deleteUpdate(message) {
	try {
		const { fromMe, id, participant } = message
		if (fromMe)
			return
		let msg = this.serializeM(this.loadMessage(id))
		if (!msg)
			return
		let chat = db.data.chats[msg.chat] || {}
		if (chat.delete)
			return
		await this.reply(msg.chat, `Terdeteksi @${participant.split`@`[0]} telah menghapus pesan\nUntuk mematikan fitur ini, ketik\n*.off antidelete*`, msg, { mentions: [participant] })
		await this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
	} catch (e) {
		console.error(e)
	}
}

global.dfail = (type, m, conn) => {
	let msg = {
		rowner: `*「OWNERR BOT ONLY」*`,
		owner: `*「OWNER BOT ONLY」*`,
		mods: `*「DEV / MODS ONLY」*`,
		premium: `*「PREMIUM USER ONLY」*\n\n*Or Get Full Access Here :*\n${db.data.datas.linkgc}`,
		group: `*「GROUP ONLY」*`,
		private: `*「PRIVATE CHAT ONLY」*`,
		admin: `*「ADMIN GROUP ONLY」*`,
		nsfw: `*NSFW GAK AKTIF*`,
		botAdmin: `*「BOT HARUS JADI ADMIN」*`,
		unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Manusia.16*',
		restrict: 'Fitur ini di *disable*!'
	}[type]
	if (msg) return m.reply(msg)
}

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => {
	unwatchFile(file)
	console.log(chalk.redBright("Update 'handler.js'"))
	if (global.reloadHandler) console.log(await global.reloadHandler())
})