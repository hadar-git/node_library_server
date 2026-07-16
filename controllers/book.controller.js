import {books} from '../index.js'


 export const getAllBooks = (req, res, next) => {
try {
     const { limit = '10', page= '1' , name = ''} = req.query;
     const filtered = books.filter(book =>  book.name.includes(name));
     const startIndex = limit * (page - 1);
     const resu = filtered.slice(startIndex, startIndex + limit);
 
      res.status(200).json(resu);

} catch (err) {
    err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
    
}

export const getBookByID = (req, res, next) => {
    try {
        let b=books.find(book => Number(book.code) === Number(req.params.id));

if(b)
{
     res.status(200).send(b );
}
       
else{
        const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
}
    } catch (err) {
         err.status = 500;        
        err.type = 'server error'; 
        next(err);
    }

}

 export const addBook = (req, res, next) => { 
try {
      books.push(req.body)
 res.status(201).send(req.body);
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
  
}

export const updateBook = (req, res, next) => {


    try {
   const b= books.find(book => Number(book.code) === Number(req.params.id)) 
    if(b)
    {
       b.name= req.body.name;
        b.category=req.body.category;
        b.price= req.body.price;
     res.status(200).send(b);
    }
    else{

   const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
    } 
}
catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
} 
 }


export const updateLoaningBook = (req, res, next) => {


    try {
    
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if(!b)
    {
  const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
    }
    else if(  b.isBorrowed ==false  )
    {
        b.isBorrowed=true;

        b.loans.push({ borrowDate: new Date(), customerCode: req.body.customerCode })
        res.status(200).send(b);

    }
    else{
      const err = new Error('already in use');
    err.status = 409; 
    err.type = 'conflict';
    next(err);
    }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
}


export const updateReturnedBook = (req, res, next) => {


    try {
     const b= books.find(book => Number(book.code) === Number(req.params.id)) 
     if(!b)
    {
  const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
    }
    else if(b.isBorrowed ==true  )
        {
        console.log("returned");
        b.isBorrowed=false
            res.status(200).send(b );
        }
        else{
             const err = new Error('not borrowed');
    err.status = 409; 
    err.type = 'conflict';
    next(err);
        }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
     
}


export const deleteBook = (req, res, next) => {


    try {
      const index = books.findIndex(book => Number(book.code) === Number(req.params.id));


    if(index!==-1)
   {
    console.log("deleted");
  
        res.status(200).send( books.splice(index, 1));
    }
    else{
       const err = new Error('not found');
    err.status = 404; 
    err.type = 'not found';
    next(err);  
    }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
   
}
