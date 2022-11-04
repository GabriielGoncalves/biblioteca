const express = require('express')
const router = express.Router()
const book = require('../controller/books')
const verifyToken = require('../middleware/verifyToken')

router.get('/', book.getBooks)
router.get('/:id', book.searchBookById)
router.get('/', book.searchBookByName)
router.post('/insert', verifyToken, book.insertBook)
router.delete('/delete/:id', verifyToken, book.deleteBook)
router.put('/update/:id', verifyToken, book.updateBook)

module.exports = {
    routes: router
}