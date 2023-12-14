import axios from 'axios';
import cheerio from "cheerio";
import { back_api } from '$lib/const';

export const prerender = false;

export const load = async ({ params, fetch, url }) => {
    
    const { link } = params
    let posts;

    try {

        const res = await axios.post(`${back_api}/main/menu`, {
            link
        })
        posts = res.data.posts;

    } catch (error) {

    }
    for (let i = 0; i < posts.length; i++) {
        const date = new Date(posts[i].bo_created_at);
        const year = date.getFullYear().toString().slice(2); // '23'
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // '07'
        const day = date.getDate().toString().padStart(2, "0"); // '14'
        posts[i]["date_str"] = `${year}.${month}.${day}`;

        const $ = cheerio.load(posts[i]["bo_content"]);
        const imageTag = $("img");
        posts[i]["img_link"] = imageTag.length
            ? imageTag.eq(0).attr("src")
            : "/no-image.png";
        posts[i]["text"] = $("p").text();
    }
    return { posts }
}