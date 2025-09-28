import db from "@/lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const { user } = await req.json();
    if (!user.email || !user.password)
      return Response.json({ status: 400, error: "Email or Password empty" });
    
    const [rows] = await db.query("select * from users where email = ? ", [user.email]);
    if (rows.length === 0) {
  return Response.json({ status: 400, error: "email or password wrong" });
}
    const valid =  await bcrypt.compare(user.password,rows[0].password);
    if (!valid) return Response.json({ status: 400, error: "email or password wrong" });
    const token = jwt.sign({user:user.email},"helloworld",{expiresIn:"1h"})
    cookies().set("token",token,{httpOnly:true,maxAge:3600});
    return Response.json({ status: 200, message: token });
  } catch (error) {
    return Response.json({ status: 400, error: error.message });
  }
}
