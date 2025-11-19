import db from "@/lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function POST(req) {
  try {
    const { user } = await req.json();
    if (!user.email || !user.password || !user.phone || !user.name)
      return Response.json({ error: "Email or Password empty" },{status: 400,});
    
    const pass = await bcrypt.hash(user.password,10);
    const [rows] = await db.query("insert into users(name,email,phone,password) values(?,?,?,?)", [user.name,user.email,user.phone,pass]);
    if (rows.length == 0) return Response.json({  error: "email or password wrong" },{status: 400,});
    const token = jwt.sign({user:user.email,id : rows.insertId},process.env.JWT_SECRET,{expiresIn:"1h"})
    req.cookies.set("token",token,{httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 3600, 
    // });         // in seconds
    path: "/",
    domain: ".casemate.icu" });
    const [rows2] = await db.query("insert into stats(Users,cases,Appoinments,userid) values(0,0,0,?)",[rows.insertId]);
    if(rows2.affectedRows === 0) return Response.json({  error: "Failed to setup stats" },{status: 400,});
    return Response.json({ status: 200, message: "User Logged In" });
  } catch (error) {
    return Response.json({  error: error.message },{status: 400});
  }
}
