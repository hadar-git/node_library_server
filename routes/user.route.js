import { users } from '../users.js';

import { Router } from "express";

const router = Router();

router.get('/users', (req, res) => {

    res.status(200).send(users);
})

router.post('/register', (req, res) => {

    users.push(req.body)
    res.status(201).send(req.body);

})

router.post('/login', (req, res) => {

    const u = users.find(user => user.email === req.body.email && user.password === req.body.password)
    if(u)
    {
        res.status(200).send(u);
    }
    else{
        res.status(404).send("wrong email or password");
    }

})

export default router;