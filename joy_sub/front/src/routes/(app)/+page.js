
import cheerio from "cheerio";
import axios from "axios";
import { back_api } from "$src/lib/const";


export const load = async ({ fetch, url }) => {
    console.log(url);
    console.log();
    const subDomainName = url.hostname.split('.')[0]
    let content = {}

    try {
        const res = await axios.post(`${back_api}/subview`, {
            subDomainName
        })
    } catch (error) {
        console.error(error.message);
    }


    return {  }
}