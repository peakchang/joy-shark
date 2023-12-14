import express from "express";
import bcrypt from "bcrypt";
import { sql_con } from '../back-lib/db.js'
import { getQueryStr } from "../back-lib/lib.js";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const admBackLinkRouter = express.Router();


admBackLinkRouter.use('/get_work_list', async (req, res) => {
    let status = 'success';
    let errMessage = ""
    let work_list = [];
    const getDate = req.body.getDate
    let startOfDayString = ""
    let endOfDayString = ""

    console.log(getDate);
    if (!getDate) {
        const now = moment();

        const startOfDay = now.startOf('day');
        startOfDayString = startOfDay.format("YYYY-MM-DD HH:mm:ss");

        const endOfDay = now.endOf('day');
        endOfDayString = endOfDay.format("YYYY-MM-DD HH:mm:ss");
    } else {
        startOfDayString = `${getDate} 00:00:00`
        endOfDayString = `${getDate} 23:59:59`
    }

    console.log(startOfDayString);
    console.log(endOfDayString);

    try {
        const getWorkListQuery = `SELECT * FROM backlink_works WHERE bw_created_at >= ? AND bw_created_at <= ?`
        const getWorkList = await sql_con.promise().query(getWorkListQuery, [startOfDayString, endOfDayString]);
        work_list = getWorkList[0];
    } catch (error) {
        status = 'fail';
        errMessage = error.message
    }
    res.json({ status, work_list })
})


admBackLinkRouter.use('/target_delete_row', async (req, res) => {
    let status = 'success';
    const deleteArr = req.body.deleteArr
    for (let i = 0; i < deleteArr.length; i++) {
        try {
            const delNum = deleteArr[i];
            const deleteQuery = "DELETE FROM target WHERE tg_id = ?"
            await sql_con.promise().query(deleteQuery, [delNum]);
        } catch (error) {

        }
    }
    res.json({ status })
})

admBackLinkRouter.use('/backlink_delete_row', async (req, res) => {
    let status = 'success';
    const deleteArr = req.body.deleteArr
    for (let i = 0; i < deleteArr.length; i++) {
        try {
            const delNum = deleteArr[i];
            const deleteQuery = "DELETE FROM backlinks WHERE bl_id = ?"
            await sql_con.promise().query(deleteQuery, [delNum]);
        } catch (error) {

        }
    }
    res.json({ status })
})


admBackLinkRouter.use('/backlink_ex_update', async (req, res) => {
    let status = 'success';
    const data = req.body.exUpdateRow
    for (let i = 0; i < data.length; i++) {
        const getData = data[i];
        try {
            const chkDataQuery = "SELECT * FROM backlinks WHERE bl_link = ?";
            const chkData = await sql_con.promise().query(chkDataQuery, [getData.bl_link]);
            const chk_data = chkData[0][0];
            if (!chk_data) {
                const setData = getQueryStr(getData, 'insert');
                const insertDataQuery = `INSERT INTO backlinks (${setData.str}) VALUES (${setData.question})`;
                await sql_con.promise().query(insertDataQuery, setData.values);
            }
        } catch (error) {
            // console.error(error.message);
        }
    }
    res.json({ status })
})

admBackLinkRouter.use('/backlink_update', async (req, res) => {
    let status = "success";

    const data = req.body.updateData;
    let duplicatesNum = 0;
    for (let i = 0; i < data.length; i++) {
        try {
            const obj = data[i];
            const chkQuery = "SELECT bl_link FROM backlinks WHERE bl_link = ?";
            const chkData = await sql_con.promise().query(chkQuery, [obj.bl_link]);
            const chk_data = chkData[0];
            if (chk_data.length > 1) {
                duplicatesNum++
            } else {
                const copiedObj = Object.assign({}, obj);
                delete copiedObj.bl_id;
                const objStr = getQueryStr(copiedObj, 'update');
                const updateQuery = `UPDATE backlinks SET ${objStr.str} WHERE bl_id=?`;
                objStr.values.push(obj.bl_id);
                await sql_con.promise().query(updateQuery, objStr.values);
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    res.json({ status, duplicatesNum });
})

admBackLinkRouter.use('/backlink_add_row', async (req, res) => {
    let status = "success";
    const data = req.body.addData;
    let message = "";

    try {
        const chkDataQuery = "SELECT bl_link FROM backlinks WHERE bl_link = ?";
        const chkData = await sql_con.promise().query(chkDataQuery, [data.bl_link]);
        const chk_data = chkData[0];
        if (chk_data.length == 0) {
            const dataStr = getQueryStr(data, 'insert')
            const addRowQuery = `INSERT INTO backlinks (${dataStr.str}) VALUES (${dataStr.question})`;
            await sql_con.promise().query(addRowQuery, dataStr.values);
        } else {
            status = 'fail'
            message = '중복된 링크가 있습니다.'
        }

    } catch (error) {

    }
    res.json({ status, message });
})

admBackLinkRouter.use('/backlink_get_list', async (req, res) => {
    let status = "success";
    let backlink_list = [];
    try {
        const backlinkListQuery = "SELECT * FROM backlinks ORDER BY bl_id DESC";
        const backlinkList = await sql_con.promise().query(backlinkListQuery);
        backlink_list = backlinkList[0];
    } catch (error) {

    }
    res.json({ status, backlink_list });
})




admBackLinkRouter.use('/target_update', async (req, res) => {
    let status = "success";

    const data = req.body.updateData;


    for (let i = 0; i < data.length; i++) {
        try {
            const obj = data[i];
            const copiedObj = Object.assign({}, obj);
            delete copiedObj.tg_id;
            const objStr = getQueryStr(copiedObj, 'update');
            const updateQuery = `UPDATE target SET ${objStr.str} WHERE tg_id=?`;
            objStr.values.push(obj.tg_id);
            await sql_con.promise().query(updateQuery, objStr.values);
        } catch (error) {
            // console.error(error.message);
        }

    }
    res.json({ status });
})

admBackLinkRouter.use('/target_add_row', async (req, res) => {
    let status = "success";
    const data = req.body
    const objStr = getQueryStr(data, 'insert')
    try {
        const addRowQuery = `INSERT INTO target (${objStr.str}) VALUES (${objStr.question})`;
        await sql_con.promise().query(addRowQuery, objStr.values);
    } catch (error) {

    }
    res.json({ status });
})

admBackLinkRouter.use('/target_get_list', async (req, res) => {
    let status = "success";
    let target_list = [];
    try {
        const targetListQuery = "SELECT * FROM target";
        const targetList = await sql_con.promise().query(targetListQuery);
        target_list = targetList[0];
    } catch (error) {

    }
    res.json({ status, target_list });
})


export { admBackLinkRouter }