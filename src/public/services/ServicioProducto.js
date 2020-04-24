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

    async searchForFillFormulario(productoId) {
        const res = await fetch(`${this.URI}/update-search/${productoId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const producto = res.json()
        return producto
    }

    async updateProducto(productoId, producto) {
        const res = await fetch(`${this.URI}/update/${productoId}`, {
            method: 'POST',
            body: producto
        })
        const data = await res.json()
        console.log(data)
    }

    async searchProducto(search) {
        const res = await fetch(`${this.URI}/search/${search}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const coincidencias = await res.json()
        return coincidencias
    }

}


export default ServicioProducto