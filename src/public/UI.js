import ServicioProducto  from './services/ServicioProducto.js'
const servicioProducto = new ServicioProducto()

class UI {
    async renderProductos() {
        console.log('entra en renderProductos de UI')
        const productos = await servicioProducto.getProductos()
        const cardsContainer = document.getElementsByClassName('cards')[0]
        cardsContainer.innerHTML = ''
        productos.forEach( producto => {
            const card = document.createElement('div');
            card.classList.add('card')
            card.style.width = '18rem'
            card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${ producto.foto }" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ producto.nombre }</h5>
                    <p class="card-text">${ producto.descripcion }</p>
                    <p class="card-text">Precio: Bs. ${ producto.precio }</p>
                    <p class="card-text">Quedan ${ producto.stock } Uds.</p>
                    <div class="botones float-right">
                        <a href="#" class="btn btn-primary">Editar</a>
                        <a href="#" class="btn btn-danger">Borrar</a>
                    </div>
                </div>
            </div>
            `
            cardsContainer.appendChild(card)
        })
    }
}

export default UI