 import { bookDt, bookUpdateDt } from "../schemas_/book.schema.js";
 import { userDt } from "../schemas_/user.schema.js";


export const validateBody = ( schema )=>{
    
 return (req, res, next) => { 
    const { error } = schema.validate(req.body, { abortEarly: false });
    if(error)
    {
         const err = new Error(error.message);
                err.status = 400;
                err.type = 'validation error';
                next(err);
    }
    else{
        next();
    }
    
}
}


