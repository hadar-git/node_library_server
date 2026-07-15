import { books } from '../index.js';

import {getAllBooks, getBookByID, addBook, updateBook, updateReturnedBook, updateLoaningBook, deleteBook } from '../controllers/book.controller.js'
import { Router } from "express";

const router = Router();

// router.get('/', (req, res) => {
//   res.status(200).send('Hello World')
// })

router.get('/',getAllBooks);
router.get('/:id', getBookByID);
router.post('/', addBook);
router.put('/:id',updateBook );
router.patch('/:id/borrow',updateLoaningBook); 
router.patch('/:id/return', updateReturnedBook);
router.delete('/:id/',deleteBook );
export default router;