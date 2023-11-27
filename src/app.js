const express = require('express');
const expressHandlebars = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');  // Agregada línea de conexión a mongoose
const { connectDB } = require('../dao');
const ProductManager = require('../dao/models/ProductModel');
const CartManager = require('../dao/models/CartModel');

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://cliente-1:<soycliente-1>@e-commerce.3hwzoj5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
connectDB();

const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', 'views');

const productManager = new ProductManager();
const cartManager = new CartManager();

app.use(express.json());

const productRouter = require('./productRouter');
app.use('/api/products', productRouter(productManager));

const cartRouter = require('./CartRouter');
app.use('/api/carts', cartRouter(cartManager));

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación de gestión de productos y carritos!');
});

const server = http.createServer(app);
const io = socketIo(server);

server.listen(8899, () => {
    console.log('Servidor Express corriendo en el puerto 8899');
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
