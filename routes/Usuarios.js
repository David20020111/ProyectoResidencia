//crear usuario
app.post('/usuarios', async (req, res) => {
    const { nombre, correo, contraseña, id_rol } = req.body
    try {
        await pool.query('INSERT INTO Usuarios (nombre, correo, contraseña, id_rol) VALUS (?, ?, ?, ?)', [nombre, correo, contraseña,id_rol]);
        res.json({ message: 'Usuario reado' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

// USuarios con rol y permisos 
app.get('/usuarios/:id/permisos', async (req, res) => {
    try {
        const [rows] = await pool.query('CALL obtenerPermisosUsuario(?)', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});