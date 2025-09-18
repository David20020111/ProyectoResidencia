const { pool } = require("../db");

//crear productos
app.post('/materiales', async (req, res) => {
    const { codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion } = req.body;
    try {
        await pool.query('INSERT INTO materiales (codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion) VALUES (?, ?, ?, ?, ?, ?)',
        [codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion]);
        res.json({ message: 'Producto creado correctamente' });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Listar productos
app.get('/materiales', async (req, res) => {
    try{
        const [rows] = await pool.query(`SELECT p.*, c.nombre AS categoria FROM materiales p JOIN categorias c ON p.id_categoria = c.id_categoria`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//obtener material por id
app.get('/materiales/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM materiales WHERE id_producto=?', [req.params.id]);
        if (rows.legth > 0) res.json(rows[0]);
        else res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar material
app.put('/productos/:id', async (req, res) => {
    const { codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion } = req.body;
    try {
        await pool.query('UPDATE materiales SET codigo=?, nombre=?, id_categoria=?, stock_actual=?, sock_minimo=?, ubicacion=? WHERE id_product0=?',
            [codigo, nombre, id_categoria, stock_actual, stock_minimo, ubicacion, req.params.id]);
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Eliminar material
app.delate('/materiales/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM materiales WHERE id_producto=?', 
            [req,params,id]);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});