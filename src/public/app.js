import UI from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI()
    ui.loadAllProductos()
})

document.getElementById('form-producto').addEventListener('submit', e => {
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
    e.preventDefault()
})

document.getElementById('tarjetas-productos').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        if (confirm('¿Estás seguro de borrar este producto?')) {
            const ui = new UI()
            ui.deleteProducto(e.target.getAttribute('_id'))
            // ui.renderMessage('Producto eliminado', 'danger', 3000)
        }
    }

    e.preventDefault()
})

document.getElementById('tarjetas-productos').addEventListener('click', e => {
    if (e.target.classList.contains('update')) {
        const ui = new UI()
        ui.fillFormulario(e.target.getAttribute('_id'))    // buscar el id del producto y cargar los datos en el formulario
        window.scrollTo(0,0)   // hay que mover la ventana hasta el formulario
    }
})

document.getElementById('cancelar').addEventListener('click', () => {
    const ui = new UI()
    ui.clearFormulario()
})

document.getElementById('buscar').addEventListener('click', e => {
    const busqueda = document.getElementById('busqueda').value
    const ui = new UI()
    if (busqueda) {
        ui.searchProducto(busqueda)
    } else {
        ui.loadAllProductos()
    }
    e.preventDefault()
})

document.getElementById('busqueda').addEventListener('input', e => {
    const busqueda = document.getElementById('busqueda').value
    const ui = new UI()
    if (busqueda) {
        ui.searchProducto(busqueda)
    } else {
        ui.loadAllProductos()
    }

    e.preventDefault()
})