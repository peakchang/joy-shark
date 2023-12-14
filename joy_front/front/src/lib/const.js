// place files you want to import through the `$lib` alias in this folder.

// 건강정보,연예정보,맛집정보,분양정보,기타정보
export const category_list = [
    {link : 'humor', name : '유머'},
    {link : 'talant', name : '연예'},
    {link : 'it', name : 'IT'},
    {link : 'estate', name : '분양'},
    {link : 'etc', name : '기타'},
]

export const siteName = '기쁨 가득 샤크맨'

export const back_api = `${import.meta.env.VITE_SERVER_URL}/api/v7`