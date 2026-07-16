import { notFound } from '../middlewares/error.middleware.js';
import {users} from '../users.js'


 export const getAllUsers = (req, res, next) => {
try{
    res.status(200).send(users);
}
    
catch(err)
{
   err.status = 500;        
  err.type = 'server error'; 
  next(err);
}
}

export const registerUser = (req, res, next) => {
try {
     users.push(req.body)
 res.status(201).send(req.body);
} catch (err) {
        err.status = 500;        
        err.type = 'server error'; 
        next(err);
}

}

export const loginUser = (req, res, next) => {
try {
    const u = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if(u)
    {
        res.status(200).send(u);
    }
    else{
        
       const err = new Error('could not find it');
    err.status = 401; 
    err.type = 'authentication error';
    next(err);
    }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
} 
}
