import express from "express";
import moment from "moment-timezone";
import bcrypt from "bcrypt";
import { sql_con } from '../back-lib/db.js'

const subviewRouter = express.Router();



subviewRouter.post('/', async (req, res, next) => {
    let status = true;
    console.log(req.body.subDomainName);
    res.json({ status })
})



export { subviewRouter }