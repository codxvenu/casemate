import db from "@/lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const { user } = await req.json();
    console.log(user);
    
    if (!user.email || !user.password)
      return Response.json({  error: "Email or Password empty" },{status: 400});
    
    const [rows] = await db.query("select * from users where email = ? ", [user.email]);
    if (rows.length === 0) {
  return Response.json({ error: "email or password wrong" },{status: 400,});
}
    const valid =  await bcrypt.compare(user.password,rows[0].password);
    if (!valid) return Response.json({ error: "email or password wrong" },{status: 400});
    const token = jwt.sign({user:user.email,id : rows[0].id},process.env.JWT_SECRET,{expiresIn:"1h"})
    const store = await cookies()
    // store.set("token",token);
    store.set("token",token,{httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 3600,          // in seconds
    path: "/",
    domain: ".casemate.icu" });
    const [rows2] = await db.query("select id,email,avatar,name from users where id = ?",[rows[0].id])
    return Response.json({ status: 200, message: "User Logged In" ,user : rows2[0] });
  } catch (error) {
    console.log(error);
    
    return Response.json({ error: error.message },{status: 400 });
  }
}
