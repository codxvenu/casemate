const mysql2 = require("mysql2")

const pool = mysql2.createPool({
    host : process.env.DATABASE_URL,
    user : process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
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