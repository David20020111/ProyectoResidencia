const { application, request, response } = require("express");
const pool = require("../db");

// stock bajo (igual que la vista de inventario bajo)
application.get('reportes/stock_bajo', async(request, response) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM vista_inventario_bajo');
        response.json(rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//movimientos diarios (igual que la vista de movimientos diarios)
application.get('/reportes/movimientos-diarios', async(request, response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_movientos diarios');
        response.json(rows);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//top  productos mas movidos (consulta directa)
app.get('/reportes/top-productos', async (request, response) => {
    try {
        const [rows] = await pool.query(`
                SELECT p.nombre, COUNT(m.id.movimiento) AS total_movimientos
                FROM movimientos m
                join materiales p ON m.id_producto = p.id_producto
                GROUP BY p.nombre
                ORDER BY total_movimientos DESC
                LIMIT 5
            `);
        response.json(rows)
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});
