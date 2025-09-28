import db from "@/lib/db.js";
import { authMiddleware } from "../../middleware/auth";
import bcrypt from "bcrypt";

export async function POST(req) {
    try{
        const {email,password,code} = await req.json();
        if(!email|| !password || !code){
         return Response.json({ error : "Email Password or code invalids"},{status : 400})
        }    
        const [rows] = await db.query("select * from users where email = ?",[email]);
        console.log(rows[0].password.slice(5,10),code);
        
        if(rows.length == 0 || rows[0].password.slice(5,10) !== code.trim()) return Response.json({ error : "Email Password or code invalid"},{status : 400})
        const pass = await bcrypt.hash(password,10);
        const [result] = await db.query("update users set password = ? where email = ? ",[pass,user.user]);
        if(result.affectedRows == 0) return Response.json({ error : "Email Password or code invalid"},{status : 400})
        return Response.json({status : 200 , message : "Password Changed!"})
    }catch (Err){
        return Response.json({error:Err.message},{status:400});
    }
}