//Listar permisos
app.get('/permisos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Permisos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Crear permiso
app.post('/permisos', async (req, res) => {
    const { nombre_permiso } = req.body;
    try {
        await pool.query('INSERT INTO Permisos (nombre_permiso) VALUES (?)', [nombre_permiso]);
        res.json({ message: 'Permiso creado' });
    } catch (error) { 
        res.estatus(500).json({ error: error.message });
    }
});