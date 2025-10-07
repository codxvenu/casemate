import db from "@/lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function POST(req) {
  try {
    const { user } = await req.json();
    if (!user.email || !user.password || !user.phone || !user.name)
      return Response.json({ error: "Email or Password empty" },{status: 400,});
    
    const pass = await bcrypt.hash(user.password,10);
    console.log(user.phone);

    const [rows] = await db.query("insert into users(name,email,phone,password) values(?,?,?,?)", [user.name,user.email,user.phone,pass]);
    if (rows.length == 0) return Response.json({  error: "email or password wrong" },{status: 400,});
    const token = jwt.sign({user:user.email,id : user.id},"helloworld",{expiresIn:"1h"})
    req.cookies.set("token",token,{httpOnly:true,maxAge:3600});
    return Response.json({ status: 200, message: "User Logged In" });
  } catch (error) {
    return Response.json({  error: error.message },{status: 400});
  }
}
