const mysql2 = require("mysql2")

const pool = mysql2.createPool({
    host : "89.117.139.1",
    user : "u679703987_casemate",
    password:"u679703987_Casemate",
    database : "u679703987_casemate",
    connectionLimit : 10,
    queueLimit : 0
})
const db = pool.promise();

export async function getUserbyEmail(email){
    try{
       const [rows] = await db.query("select * from users where email = ? ",[email]);
        if(rows.length == 0) return null
        return rows[0]
    }catch(err){
        return null
    }

}

export default db;