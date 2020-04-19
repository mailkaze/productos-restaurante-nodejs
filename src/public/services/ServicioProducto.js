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
        console.log('el servicio envió los datos por POST a la API:')
        console.log(producto)
        const info = await res.json()
        console.log(info)
    }


}


export default ServicioProducto