const { request, response, application, json } = require("express");
const { pool } = require("../db");

//registrar entrada
app.post('/movimiento/entrada', async (request, response) =>{
    const { id_producto, cantidad, id_usuario} = request.body;
    try {
        await pool.query('CALL registrarEntrada(?,?,?)', [id_producto, cantidad, id_usuario]);
        response.json({ message: 'Entrada registrada correctamente'});
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//Registrar salida 
app.post('/movimientos/salida', async (request, response) => {
    const { id_producto, cantidad, id_usuario } = request.body;
    try {
        await pool.query('CALL registrarSalida(?,?,?)', [id_producto, cantidad, id_usuario]);
        response.json({ message: 'Salida registrada correctamente' });
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
});

//movimientos generales 
app.get('/movimientos', async (request, response) => {
    try {
        const [rows] = await pool.query(`
                SELECT m.*, p.nombre AS producto, u.nombre AS usuario
                FROM movimientos m 
                JOIN materiales p ON m.id_producto = p.id_producto
                JOIN usuarios u ON m.id_usuario = u.id_usuario
                ORDER BY m.fecha DESC
            `)
        response.json(rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//Movimientos por productos
app.get('movimientos/producto/:id', async (request, response) => {
    try {
        const [rows] = await pool.query('CALL reporteMovimientoProducto(?)', [request.params.id]);
        response.json(rows[0]);
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

//Ultimos movimientos (vista)
app.get('/movimientos ultimos', async(request, response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_ultimos_movimientos');
        response.json(rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//movimientos diarios 
app.get('/movimientos/diarios', async (request, response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_movimientos_diarios');
        request.json(rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

