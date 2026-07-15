import {users} from '../users.js'


 export const getAllUsers = (req, res, next) => {

    res.status(200).send(users);
}

export const registerUser = (req, res, next) => {

    users.push(req.body)
 res.status(201).send(req.body);
}

export const loginUser = (req, res, next) => {

    const u = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if(u)
    {
        res.status(200).send(u);
    }
    else{
        res.status(404).send("wrong email or password");
    }
}
