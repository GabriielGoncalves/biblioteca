const db = require('../model/database')
const app = require('express')()

app.get('/books', async (req, res, next) => {
        const result = await db.findBooks() 
        res.status(200).json(result)
})

app.post('/insert', async (req, res) => {
        const ress = await db.insertBook(req.body)
        res.status(201).json({message: 'Livro salvo com sucesso'})
})

app.delete('/delete/:id', async(req, res) => {
        await db.deleteBook(req.params.id)
        res.status(200).json({message: 'Deletado com sucesso'})
})

app.put('/update/:id', async(req, res) => {
    const [id, body] = [req.params, req.body]

    await db.updateBook(id, body)
    res.status(200).json({message: "Atualizado com sucesso"})
})

module.exports = app;