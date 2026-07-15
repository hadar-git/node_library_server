import { users } from '../users.js';

import { getAllUsers, registerUser, loginUser } from '../controllers/user.controller.js'
import { Router } from "express";

const router = Router();

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;

