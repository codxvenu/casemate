import { ZodError } from "zod";
export async function Validator(schema,data) {
    try{
        return {
            success : true,
            data : schema.parse(data),
            error : null
        }
    }catch(err){
        if(err instanceof ZodError) console.log(err);
        
            
    //     return {
    //     success : false,
    //     data : null,
    //     error : err.issues.map((i)=>{return {field : i.path[0],message : i.message}})
    // }
    return {
        success : false,
        data : null,
        error : "unexpected error in validation"}
    }
}
