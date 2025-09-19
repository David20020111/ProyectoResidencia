// Listar roles 
app.get('/roles', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Roles');
    res.json(rows);
  } catch (error) { 
    res.status(500).json({ error: error.message }); }
});

//crear rol
app.post('/roles', async (req, res) => {
    try {
        await pool.query('INSERT INTO Roles (nombre_rol) VALUES (?)', [nombre_rol]);
        res.json({ message: 'Rol creado' })
    } catch (error) { 
        res.status(500).json({error: error.message}); }
});

// Obtener permisos de un rol 
app.get('/roles/:id/permisos', async (req, res) => {
    try {
        const [rows] = await pool.query('CALL obtenerPermisoRol(?)', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
         res.status(500).json({ error: error.message }); }
});

//Asignar permiso a rol 
app.post('/roles/:idRol/permisos/:idPermiso', async (req, res) => {
    try {
        await pool.query('CALL asignarPermisoRol(?, ?)', [req.params.idRol, req.params.idPermiso]);
        res.json({ message: 'Permiso asignado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Quitar permiso a rol
app.delate('/roles/:idRol/permisos/:idPermiso', async(req, res) => {
    try {
        await pool.query('CALL quitarPermisoRol(?, ?, ?)', [req.params.idRol, req.params.idPermiso]);
        res.json({ message: 'Permiso quitado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});