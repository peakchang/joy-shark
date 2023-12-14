import { back_api } from "$lib/const";
interface ReqTypes {
    fetch: any;
    url: any;
    params: any;
    data: any;
}
export const load = async ({ fetch, params, url }: ReqTypes) => {
    const { id } = params;
    let datas: any = {};

    try {
        const resPosts = await fetch(`${back_api}/main/get_modify`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await resPosts.json();

        datas['get_content'] = result.get_content
        datas['get_category'] = result.get_category

    } catch (error: any) {
        console.error(error.message);

    }
    



    return { datas };
}