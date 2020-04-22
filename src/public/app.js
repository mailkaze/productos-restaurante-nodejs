import UI from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI()
    ui.renderProductos()
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
        // buscar el id del producto y cargar los datos en el formulario
        ui.fillFormulario(e.target.getAttribute('_id'))
        // si el formulario está escondido hay que mostrarlo
        const collapse = document.getElementsByClassName('collapse')[0]
        if (!collapse.classList.contains('show')) {
            collapse.classList.add('show')
        }
        // hay que mover la ventana hasta el formulario
        window.scrollTo(0,0)
        // el botón de guardar del formulario debe saber si es producto nuevo o es edición
        // llamar a la funcion update
    }
})