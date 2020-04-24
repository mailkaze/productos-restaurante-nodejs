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
    //TODO: no borrar la imagen si es el default.jpg
    unlink(path.resolve('./src/public' + producto.rutaImagen))
    res.json({messaje: 'Producto Eliminado'})
})

// Buscar un producto para mostrarlo en el formulario con el find e hacer Update
router.post('/update-search/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id)
    res.json(producto)
})

// Update
router.post('/update/:id', async (req, res) => {
    const {nombre, descripcion, precio, stock, seccion} = req.body
    var producto = await Producto.findById(req.params.id)
    producto.nombre = req.body.nombre
    producto.descripcion = req.body.descripcion
    producto.precio = req.body.precio
    producto.stock = req.body.stock
    producto.seccion = req.body.seccion
    if (req.file != undefined) {
        //TODO: no borrar la imagen si es el default.jpg
        unlink(path.resolve('./src/public' + producto.rutaImagen))   // si el usuario está subiendo una nueva foto, borramos la que está en el servidor
        const rutaImagen = '/uploads/' + req.file.filename   // y recolectamos el nombre de la que está subiendo para actualizar el campo
        producto.rutaImagen = rutaImagen
    }
    await producto.save()
    res.json({messaje: 'Producto Modificado'})
})

module.exports = router
