if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')

// Inicialización
const app = express()
require('./database')


// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.use('/api/productos', require('./routes/productos'))

// Archivos estáticos
app.use(express.static(path.join(__dirname, './public')))

// Arrancar el servidor
app.listen(app.get('port'), () => {
    console.log('servidor escuchando en puerto', app.get('port'))
})