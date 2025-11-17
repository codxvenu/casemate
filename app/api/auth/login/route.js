import db from "@/lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const { user } = await req.json();
    if (!user.email || !user.password)
      return Response.json({  error: "Email or Password empty" },{status: 400});
    
    const [rows] = await db.query("select * from users where email = ? ", [user.email]);
    console.log(rows);
    if (rows.length === 0) {
  return Response.json({ error: "email or password wrong" },{status: 400,});
}
    const valid =  await bcrypt.compare(user.password,rows[0].password);
    if (!valid) return Response.json({ error: "email or password wrong" },{status: 400});
    const token = jwt.sign({user:user.email,id : rows[0].id},"helloworld",{expiresIn:"1h"})
    const store = await cookies()
    // store.set("token",token);
    store.set("token",token,{httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 3600,          // in seconds
    path: "/",
    domain: ".casemate.icu" });
    return Response.json({ status: 200, message: token });
  } catch (error) {
    return Response.json({ error: error.message },{status: 400 });
  }
}
