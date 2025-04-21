const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Habilita CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200' // Cambia al dominio de tu frontend si es diferente
}));


app.get('/api/message', (req, res) => {
    console.log('Request received');
    res.json({ message: 'Hola desde el backend!' });
    console.log('Response sent');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
