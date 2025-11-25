"use server"
import { verifyToken } from "@/middleware";
import { cookies } from "next/headers";
import db from "./db";

export async function getUser() {
    try{
        const token = (await cookies()).get("token")?.value;
        const user = await verifyToken(token);
        if(!user) return null
        const [rows] = await db.query("select * from users where id = ?",[user?.id])
        if(!rows.length) return null
        return rows[0]
    }catch(e){
        console.log(e?.message,"error while fetching user") 
        return null
    }
}