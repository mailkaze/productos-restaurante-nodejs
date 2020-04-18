const { Router } = require('express')
const router = Router()

const { unlink } = require('fs-extra')
const path = require('path')
const Producto = require('../models/Producto')

router.get('/', async (req, res) => {
    const productos = await Producto.find()
    res.json(productos)
    // res.send('<h2>La API funciona!</h2>')
})

module.exports = router
