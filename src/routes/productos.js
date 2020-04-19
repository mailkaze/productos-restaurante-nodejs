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
    console.log('el router responde a la petición POST')
    const {nombre, descripcion, precio, stock, seccion} = req.body
    // si no se envió un archivo del frontend, no se manda el dato a la DB
    // el schema de producto mete por default la imagen default.jpg si no recibe este campo:
    var newProducto = ""
    if (req.file != undefined) { 
        const rutaImagen = '/uploads/' + req.file.filename
        newProducto = new Producto({nombre, descripcion, precio, stock, seccion, rutaImagen})
    } else {
        newProducto = new Producto({nombre, descripcion, precio, stock, seccion})
    }
    await newProducto.save()
    res.json({message: 'Producto Guardado'})
})

module.exports = router
