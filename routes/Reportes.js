//Stock bajo
app.get('reportes/stock_bajo', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_inventario_bajo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//Movimientos diarios
app.get('/reportes/movimientos-diarios', async (req, res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM vista_movimientos_diaros');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//top 5 productos mas movidos
app.get('/reportes/top-productos', async (req, res) => {
    try {
        const [rows] = await pool.query(`
                SELECT p.nombre, COUNT(m.id_movimiento) AS total_movimientos
                FROM Movimientos m
                JOIN Productos p ON m.id_producto = p.id_producto
                GROUP BY p.nombre
                ORDER BY total_movimientos DESC
                LIMIT 5 
            `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});