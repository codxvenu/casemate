import db from "@/lib/db";
import { authMiddleware } from "../../middleware/auth";
export async function GET(req,{params}){
    try{
        const user = await authMiddleware();
        if(!user) return Response.json({error : "User Not authenticated"},{status : 401},)
        const {id} = await params;
        const now = new Date();
        const [rows1] = await db.query("select * from chatbot where id=?",[id]);
        const [rows] = await db.query("insert into share(text,userId,messageId,created_at) values (?,?,?,?)",[rows1[0].text,rows1[0].userId,id-1,now]);
        if(rows.affecteRows > 0) return Response.json({error : "failed"},{status : 400},)
        return Response.json({shareID : rows.insertId},{status : 200})
    }catch(Err){
        console.log(Err.message);
        
        return Response.json({error : Err.message},{status : 400})
    }
    
}