import { authMiddleware } from "../../middleware/auth";
import sendEmail from "@/lib/mail";
import db from "@/lib/db";
export async function POST(req) {
    try {
        const {email} = await req.json();
        const [rows] = await db.query("select * from users where email = ? ", [email]);
        if(rows.length == 0) return Response.json({error:"User not found"},{status:400});
        await sendEmail(rows[0].email,"Password Reset",`Click <a href='http://casemate-delta.vercel.app/reset'>here</a> to reset your password. use code <strong> ${rows[0].password.slice(5,10)} </strong>`);
        return Response.json({message:"Mail sent"});
    }catch (error) {
        return Response.json({error:"Not Authenticated"},{status:401});
    }
}