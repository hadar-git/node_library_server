import { books } from '../index.js';

import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

router.get('/books', (req, res) => {

     const { limit = '10', page= '1' , name = ''} = req.query;
     const filtered = books.filter(book =>  book.name.includes(name));
     const startIndex = limit * (page - 1);
     const resu = filtered.slice(startIndex, startIndex + limit);


  if(resu){
      res.status(200).json(resu);
  }
  else{
 
   res.status(400).json('errrrr');
 
  }
})

router.get('/books/:id', (req, res) => {

    let b=books.find(book => Number(book.code) === Number(req.params.id));
    if(b)
    {
res.status(200).send(b );
    }
 else{
    res.status(404).send("errorrrrrr");
 }

})


router.post('/books/', (req, res) => {

    books.push(req.body)
 res.status(201).send(req.body);

})


router.put('/books/:id', (req, res) => {
     const b= books.find(book => Number(book.code) === Number(req.params.id)) 
if(b)
{
   b.name= req.body.name;
    b.category=req.body.category;
    b.price= req.body.price;
 res.status(200).send(b);
}
else{
     res.status(404).send("error");
}

});

router.put('/books/:id', (req, res) => {
     const b= books.find(book => Number(book.code) === Number(req.params.id)) 
if(b)
{
   b.name= req.body.name;
    b.category=req.body.category;
    b.price= req.body.price;
 res.status(200).send(b);
}
else{
     res.status(404).send("error");
}

});

router.patch('/books/:id/borrow', (req, res) => {
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if( b && b.isBorrowed ==false  )
    {
        b.isBorrowed=true;

        b.loans.push({ borrowDate: new Date(), customerCode: req.body.customerCode })
        res.status(200).send(b);

    }
    else{
        res.status(404).send('already in use');
    }
});

router.patch('/books/:id/return', (req, res) => {
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if( b && b.isBorrowed ==true  )
    {
    console.log("returned");
    
        res.status(200).send( b.isBorrowed=false);
    }
    else{
        res.status(404).send('no idea');
    }
});

router.delete('/books/:id', (req, res) => {
   const index = books.findIndex(book => Number(book.code) === Number(req.params.id));


    if(index!==-1)
   {
    console.log("ddd");
  
        res.status(200).send( books.splice(index, 1));
    }
    else{
        res.status(404).send('not found');
    }
});

export default router;