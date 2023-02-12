import cheerio from 'cheerio'
import fetch from 'node-fetch'

async function facebookDl(url) {
	let res = await fetch('https://fdownloader.net/')
	let $ = cheerio.load(await res.text())
	let token = $('input[name="__RequestVerificationToken"]').attr('value')
	let json = await (await fetch('https://fdownloader.net/api/ajaxSearch', {
		method: 'post',
		headers: {
			cookie: res.headers.get('set-cookie'),
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			referer: 'https://fdownloader.net/'
		},
		body: new URLSearchParams(Object.entries({ __RequestVerificationToken: token, q: url }))
	})).json()
	let $$ = cheerio.load(json.data)
	let result = {}
	$$('.button.is-success.is-small.download-link-fb').each(function () {
		let quality = $$(this).attr('title').split(' ')[1]
		let link = $$(this).attr('href')
		if (link) result[quality] = link
	})
	return result
}

export {
	facebookDl
}
