const express = require('express');//importar el modulo expres para crear apliciones web y api
const cors = require('cors');
const app = express();//inicializar
const port = process.env.PORT || 3000; // Define el puerto desde una variable de entorno o por defecto 3000

// Habilita CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200' // Cambia al dominio de tu frontend si es diferente
}));

// Rutas
app.get('/api/message', (req, res) => {//peticion req y resp
    console.log('Request received');
    res.json({ message: 'Hola desde el backend!' });
    console.log('Response sent');
});

// Exporta solo la app, para que se pueda utilizar por otros archivos
module.exports = app;

// Si el archivo que esta definido en el servidor espress se ejecuta directamente,o se importa en otro modulo
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}
