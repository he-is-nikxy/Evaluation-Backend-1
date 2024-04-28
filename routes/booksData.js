const express = require('express');
const router = new express.Router();
const Book = require("../models/books");


router.post("/books", async (req, res) => {
    try {
        const books = new Book(req.body);
        const result = await books.save();
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

router.get("/books", async (req, res) => {
    try {
        const result = await Book.find(req.body);
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }

})

router.get("/books/:id", async (req, res) => {
    try {
        const result = await Book.findById(req.params.id);
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

router.patch("/books/:id", async (req, res) => {
    try {
        const result = await Book.findByIdAndUpdate(req.params.id, req.body);
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

router.delete("/books/:id", async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

module.exports = router;