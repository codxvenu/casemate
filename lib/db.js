const mysql2 = require("mysql2")

const pool = mysql2.createPool({
    host : "194.163.35.51",
    user : "u679703987_casemate",
    password:"u679703987_Casemate",
    database : "u679703987_casemate",
    connectionLimit : 10,
    queueLimit : 0
})
const db = pool.promise();

export default db;