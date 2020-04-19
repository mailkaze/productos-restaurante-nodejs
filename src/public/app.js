import UI from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI()
    ui.renderProductos()
})

document.getElementById('form-producto').addEventListener('submit', e => {
    console.log('captura el evento submit del formulario')

    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value
    const stock = document.getElementById('stock').value
    const seccion = document.getElementById('seccion').value
    const foto = document.getElementById('foto').files[0]  

    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('descripcion', descripcion)
    formData.append('precio', precio)
    formData.append('stock', stock)
    formData.append('seccion', seccion)
    formData.append('foto', foto) 

    const ui = new UI()
    ui.addNewProducto(formData)
    //ui.renderMessage('producto guardado', 'success', 3000)
    console.log('guardó los datos en variables y llamó a UI')
    e.preventDefault()
})