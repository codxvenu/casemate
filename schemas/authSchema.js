import {z} from "zod";
export const LoginSchema = z.object({
    email : z.string().email("Invalid Email Format"),
    password : z.string().min(6,"Password Length cannot be less than 6"),
})
export const RegisterSchema = z.object({
    email : z.string().email("Invalid email Format"),
    password : z.string().min(6,"Password Length cannot be less than 6"),
    phone : z.number().min(10,"PhoneNum Length cannot be less than 6"),
    name : z.string().min(4,"Name must be atleast 4 charactars long")
})