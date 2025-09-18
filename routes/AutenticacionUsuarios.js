const { pool } = require("../db");

// login (Ejemplo simple)
application.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?', [correo, contraseña]);
        if (rows.length > 0) {
            res.json({ message: 'login exitoso', usuario: rows[0] });
        } else {
            res.status(401).json({ error: 'Credenciales invalidas'})
        }
    } catch (error){
        res.status(500).json({ error: error.message });
    }
});

//Crear usuario 
app.post('/usuarios', async (req, res) => {
    const { nombre, correo, contraseña, id_rol } = req.body;
    try {
    await pool.query('INSERT INTO usuarios (nombre, correo, contraseña, id_ rol) VALUES (?,?,?,?)', 
        [nombre, correo, contraseña, id_rol]);
    res.json({message: 'Usuario creado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Listar Usuarios 
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener usuario por ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [req.params.id]);
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ error: 'usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar Usuario
app.put('/usuarios/:id', async (req, res) => {
    const { nombre, correo, contraseña, id_rol } = req.body;
    try {
        await pool.query('UPDATE usuarios SET nombres=?, correo=?, contraseña=?, id_rol=? WHERE id_usuario=?',
            [nombre, correo, contraseña, id_rol, req.params.id]);
        res.json({ message: 'usuario actualizado correctamente' })    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await pool.query('DELATE FROM usuarios WHERE id_usuario =?', [req.params.id]);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});