const { Schema, model } = require('mongoose')

const ProductoSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: String,
    precio: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    seccion: {type: String, default: 'General' },
    foto: { type: String, default: './uploads/default.jpg'}
})

module.exports = model('Producto', ProductoSchema)