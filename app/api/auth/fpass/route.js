import { authMiddleware } from "../../middleware/auth";
import sendEmail from "@/lib/mail";
export async function POST(req) {
    try {
        await authMiddleware(req);
        const [rows] = await db.query("select * from users where email = ? ", [req.user.user]);
        if(rows.length == 0) return Response.json({status:400,error:"User not found"});
        await sendEmail(rows[0].email,"Password Reset",`Click <a href='http://casemate-delta.vercel.app/reset'>here</a> to reset your password. use code ${rows[0].password.slice(5,15)}`);
        return Response.json({status:200,message:"Authenticated"});
    }catch (error) {
        return Response.json({status:401,error:"Not Authenticated"});
    }
}