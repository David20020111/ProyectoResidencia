//CRUD Productos 
app.post('/productos', async (req, res) => {
    const { codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion } = req.body;
    try {
        await pool.query('INSERT INTO Productos (codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion) VALUES (?, ?, ?, ?, ?, ?)', 
            [codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion]);
        res.json({ message: 'Producto creado' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT p.* c.nombre AS categoria 
            FROM Productos p JOIN Categorias c ON p.id_categoria = 
            c.id_categoria`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});