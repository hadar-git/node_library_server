export const addCurrentDate =()=>{

    return (req , res, next)=>
    {
         req.curD=new Date();
        next();
    }

}


export const checkGETDate =(date)=>
{
    return (req, res, next)=>{
    if(req.method==='GET')
    {
        res.status(200).send(req.curD);
    }
    else{
         next(); 
    }
}
}