import db from "@/lib/db.js";
import { authMiddleware } from "../../middleware/auth";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try{
        await authMiddleware(req);
        const {email,password,code} = await req.json();
        const [rows] = await db.query("select * from users where email = ?",[email]);
        if(rows.length == 0 || password.slice(5,10) !== code) return Response.json({status : 400, error : "Email Password or code invalid"})
            const pass = await bcrypt.hash(password,10)
        const [row] = await db.query("update users set password = ? where email = ? ",[pass,email]);
        if(row.length == 0) return Response.json({status : 400, error : "Email Password or code invalid"})

        return Response.json({status : 200 , message : "Password Changed!"})
    }catch (Err){
        return Response.json({status:401,error:Err});
    }
}