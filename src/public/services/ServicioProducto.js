class ServicioProducto {
    constructor() {
        // desarrollo: 
        this.URI = 'http://localhost:3000/api/productos'
        // producción:
        // this.URI = 'api/productos'
    }
    
    async getProductos() {
        const res = await fetch(this.URI)
        const productos = res.json()
        return productos
    }

    async postProducto(producto) {
        const res = await fetch(this.URI, {
            method: 'POST',
            body: producto
        })
        const info = await res.json()
        console.log(info)
    }

    async deleteProducto(productoId) {
        const res = await fetch(`${this.URI}/${productoId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        const data = await res.json()
        console.log(data)
    }

}


export default ServicioProducto