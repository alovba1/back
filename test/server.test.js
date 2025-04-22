const request = require('supertest');
const app = require('../server');

let server;

// Inicia el servidor antes de ejecutar las pruebas
beforeAll(async () => {
    server = app.listen(3000, () => {
        console.log('✅ Servidor corriendo en http://localhost:3000');
    });

    // Esperar unos segundos para asegurar que el servidor esté completamente listo
    await new Promise(resolve => setTimeout(resolve, 10000)); // Aumentar a 10 segundos
});

// Cierra el servidor después de ejecutar las pruebas
afterAll(async () => {
    if (server) {
        await server.close();
        console.log('🚀 Servidor cerrado después de las pruebas.');
    }
});

describe('GET /api/message', () => {
    it('Debería devolver un mensaje', async () => {
        jest.setTimeout(15000); // Aumentar el tiempo de espera para Jest
        const res = await request(app).get('/api/message');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Hola desde el backend!');
    });
});
