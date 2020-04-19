class ServicioProducto {
    constructor() {
        // desarrollo: 
        this.URI = 'http://localhost:3000/api/productos'
        // producción:
        // this.URI = 'api/productos'
    }
    
    async getProductos() {
        console.log('entra en getProductos de ServicioProducto')
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


}


export default ServicioProducto