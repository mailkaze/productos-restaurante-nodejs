import UI from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
    console.log('dispara el evento contenido cargado')
    const ui = new UI()
    ui.renderProductos()
})