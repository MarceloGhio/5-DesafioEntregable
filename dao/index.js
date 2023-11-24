const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('tu_conexion_a_mongo', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
