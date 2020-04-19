const { Router } = require('express')
const router = Router()

const { unlink } = require('fs-extra')
const path = require('path')
const Producto = require('../models/Producto')

router.get('/', async (req, res) => {
    const productos = await Producto.find()
    res.json(productos)
})

router.post('/', async (req,res) => {
    const {nombre, descripcion, precio, stock, seccion} = req.body
    const rutaImagen = '/uploads/' + req.file.filename
    const newProducto = new Producto({nombre, descripcion, precio, stock, seccion, rutaImagen})
    await newProducto.save()
    res.json({message: 'Producto Guardado'})
})

module.exports = router
