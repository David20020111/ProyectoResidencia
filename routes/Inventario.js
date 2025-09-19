//inventario completo 
app.get('/inventario', async (req, res) => {
    try {
        const [rows] = await pool.query('CALL reporteInventario');
        res.json(rows[0])
    } catch (error) {
        res.status(500).json ({ error: error.message });
    }
});

//inventario bajo
app.get('/inventario/bajo', async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_inventario_bajo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});