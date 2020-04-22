import ServicioProducto  from './services/ServicioProducto.js'
const servicioProducto = new ServicioProducto()

class UI {
    async renderProductos() {
        const productos = await servicioProducto.getProductos()
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
        await servicioProducto.postProducto(producto)
        //this.clearFormProducto
        this.renderProductos()
    }

    async deleteProducto(productoId) {
        await servicioProducto.deleteProducto(productoId)
        this.renderProductos()
    }

    async fillFormulario(productoId) {
        const producto = await servicioProducto.searchForFillFormulario(productoId)

        document.getElementById('nombre').value = producto.nombre
        document.getElementById('descripcion').value = producto.descripcion
        document.getElementById('precio').value = producto.precio
        document.getElementById('stock').value = producto.stock
        document.getElementById('seccion').value = producto.seccion
    }
}

export default UI