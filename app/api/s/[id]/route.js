import db from "@/lib/db";
import { authMiddleware } from "../../middleware/auth";

export async function GET(req,{params}) {
    try{
        const {id} = await params;
        const [rows] = await db.query("select * from share where shareId = ?",[id]);
        console.log(rows);
        console.log(rows[0].messageid);
        
        const[rows1] = await db.query("select * from chatbot where id = ?",[rows[0].messageId]);
        console.log(rows1);
        
        
        if(rows.length === 0 || rows1.length === 0) return Response.json({error : "Not found related Chat"},{status : 400})
            return Response.json({chat : [...rows1,{...rows[0],role : "assistant"}]})
    }catch(err){
        return Response.json({error : err.message})
    }
}   