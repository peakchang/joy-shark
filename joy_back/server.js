import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();


dotenv.config();

import { editorRouter } from "./routes/editor.js"
import { apiRouter } from "./routes/api.js"
import { admRouter } from "./routes/adm.js"
import { boardRouter } from "./routes/board.js"
import { mainRouter } from "./routes/main.js"
import { resRouter } from './routes/res.js';

import { subdomainRouter } from './routes/subdomain.js';
import { subviewRouter } from './routes/subview.js';




// import { apiRouter } from "./routes/exapi.js"
app.set('port', process.env.PORT || 3020);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

app.use(express.static('public', { ignore: ['favicon.ico'] }));
app.use('/editor', express.static(path.join(__dirname, 'public/uploads/editor')));
app.use('/image', express.static(path.join(__dirname, 'public/uploads/image')));

let originLink;
if (process.env.NODE_ENV === 'production') {
    originLink = process.env.SITE_LINK
} else {
    originLink = '*'
}
console.log(originLink);
let corsOptions = {
    // 여기는 svelte (프론트엔드) 가 돌아가는 주소
    origin: originLink,
    credentials: true
}
app.use(cors(corsOptions));

app.enable('trust proxy');

app.use('/api/v7/subview', subviewRouter);

app.use('/api/v7/subdomain', subdomainRouter);


app.use('/api/v7/res', resRouter);
app.use('/api/v7/adm', admRouter);
app.use('/api/v7/board', boardRouter);
app.use('/api/v7/editor', editorRouter);
app.use('/api/v7/main', mainRouter);
app.use('/api/v7', apiRouter);


app.use('/', (req, res) => {
    res.send('백엔드 생성 완료!!')
});


app.listen(app.get('port'), () => {
    console.log(`server running in port ${app.get('port')}`);
})