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

router.delete('/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id)
    await Producto.deleteOne({_id: req.params.id})
    // borramos el archivo de la foto
    unlink(path.resolve('./src/public' + producto.rutaImagen))
    res.json({messaje: 'Producto Eliminado'})
})

// Update
router.post('/:id', async (req, res) => {
    const {nombre, descripcion, precio, stock, seccion} = req.body
    // si no se envió un archivo del frontend, no se manda el dato a la DB
    // el schema de producto mete por default la imagen default.jpg si no recibe este campo:
    if (req.file != undefined) { 
        const producto = Producto.findById(req.params.id)
        // si el usuario está subiendo una nueva foto, borramos la que está en el servidor
        unlink(path.resolve('./src/public' + producto.rutaImagen))
        // y recolectamos el nombre de la que está subiendo para actualizar el campo
        const rutaImagen = '/uploads/' + req.file.filename
        Producto.updateOne(req.params.id, {nombre, descripcion, precio, stock, seccion, rutaImagen})
    } else {
        // si el usuario no está subiendo ninguna foto, no subimos ninguna ruta de imagen
        const producto = Producto.updateOne(req.params.id, {nombre, descripcion, precio, stock, seccion})
    }
    res.json({messaje: 'Producto Modificado'})
})

module.exports = router
