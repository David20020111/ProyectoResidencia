// Entrada 
app.post('/movimientos/entrada', async (req, res) => {
    const { id_trabajo, cantidad, id_usuario } = req.body;
    try {
        await pool.query('CALL registrarEntrada(?, ?, ?)', [id_trabajo, cantidad, id_usuario]);
        res.json({ message: 'Entrada registrada' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//salida
app.post('/movimientos/salida', async (req, res) => {
    const { id_producto, cantidad, id_usuario } = req.body;
    try {
        await pool.query('CALL registrarSalida (?, ?, ?)', [id_producto, cantidad, id_usuario]);
        res.json({ message: 'salida registrada' })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});