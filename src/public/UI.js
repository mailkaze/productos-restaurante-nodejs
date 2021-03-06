import ServicioProducto  from './services/ServicioProducto.js'
const servicioProducto = new ServicioProducto()

class UI {

    async loadAllProductos() {
        const todos = await servicioProducto.getProductos()
        this.renderProductos(todos)
    }

    renderProductos(productos) {
        const cardsContainer = document.getElementsByClassName('cards')[0]
        cardsContainer.innerHTML = ''
        productos.forEach( producto => {
            const card = document.createElement('div');
            card.classList.add('card')
            card.style.width = '18rem'
            card.style.marginRight = '8px'
            card.style.marginTop = '10px'
            card.innerHTML = `
                <img src="${ producto.rutaImagen }" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ producto.nombre }</h5>
                    <p class="card-text">${ producto.descripcion }</p>
                    <p class="card-text">Sección: ${ producto.seccion }</p>
                    <p class="card-text">Precio: Bs. ${ producto.precio }</p>
                    <p class="card-text">Quedan ${ producto.stock } Uds.</p>
                    <div class="botones float-right">
                        <a href="#" class="btn btn-primary update" _id="${producto._id}">Editar</a>
                        <a href="#" class="btn btn-danger delete" _id="${producto._id}">Borrar</a>
                    </div>
                </div>
            `
            cardsContainer.appendChild(card)
        })
    }

    async addNewProducto(producto) {
        const boton = document.getElementById('boton-guardar')
        if (!boton.hasAttribute('_id')) {
            // Producto nuevo
            await servicioProducto.postProducto(producto)
        } else {
            // editando producto existente
            await servicioProducto.updateProducto(boton.getAttribute('_id'), producto)
            boton.removeAttribute('_id')
        }
        this.clearFormulario()
        this.loadAllProductos()
    }

    async deleteProducto(productoId) {
        await servicioProducto.deleteProducto(productoId)
        this.loadAllProductos()
    }

    async fillFormulario(productoId) {
        const producto = await servicioProducto.searchForFillFormulario(productoId)

        document.getElementById('nombre').value = producto.nombre
        document.getElementById('descripcion').value = producto.descripcion
        document.getElementById('precio').value = producto.precio
        document.getElementById('stock').value = producto.stock
        document.getElementById('seccion').value = producto.seccion
        document.getElementById('boton-guardar').setAttribute('_id', producto._id)

        this.collapseFormulario()
    }

    clearFormulario() {
        document.getElementById('form-producto').reset()
        const collapse = document.getElementsByClassName('collapse')[0]
        this.collapseFormulario()
    }

    collapseFormulario() {
        const collapse = document.getElementsByClassName('collapse')[0]
        if (collapse.classList.contains('show')) { collapse.classList.remove('show') }
        else { collapse.classList.add('show') }
    }

    async searchProducto(search) {
        const coincidencias = await servicioProducto.searchProducto(search)
        this.renderProductos(coincidencias)
    }
}

export default UI