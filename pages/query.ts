'use server';
import {Md5} from 'ts-md5';
import axios from 'axios'
const p_key = "6270c7a7851c6755007a0296770f05917455afb5"
const pub_key = "7620c866f7a8251c6aebeb639562c510"




const getAuthString = () => {
    const ts = Date.now()
    //md5(ts+privateKey+publicKey)
    const hash = Md5.hashStr(ts+p_key+pub_key)
    return  {ts, hash: `hash=${hash}`}
}

const marvelApiUrl = "http://gateway.marvel.com/v1/public/"
const comicsUrl = "comics?"
const characters = "characters?"

export const search = async () => {
    const auth = getAuthString()
    const apiUrl = marvelApiUrl + comicsUrl + `&apikey=${pub_key}&ts=${auth.ts}&${auth.hash}` 
    console.log(apiUrl)
    axios.get(apiUrl) 
}