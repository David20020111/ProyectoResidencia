const { application } = require("express");
const { pool } = require("../db");

// inventario completo 
app.get('/inventario', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL reporteInventario()');
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Inventario bajo 
app.get('/inventario/bajo', async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_inventario_bajo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Inventario por categoria
app.get('/inventario/categoria/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT p.*, c.nombre AS categoria FROM materiales p JOIN categorias = c.id_categoria=?`,
            [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});