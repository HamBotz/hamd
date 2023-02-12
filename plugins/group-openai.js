/*import { Configuration, OpenAIApi } from "openai";

let handler = async (m, {conn, text, usedPrefix, command}) => {
    if (!text) throw 'Masukan teks.'
    const configuration = new Configuration({ apikey: "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"});
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0,
        max_token: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0
    });
    m.reply(response.data.choices[0].text)
}*/

import { Configuration, OpenAIApi } from "openai";
let handler = async (m, { conn, text }) => {
if (!text) throw "[!] Masukkan teks."
const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
            m.reply(response.data.choices[0].text)
    }

handler.menugroup = ['ai', 'openai']
handler.tagsgroup = ['group']
handler.command = /^(ai|openai)$/i

export default handler
