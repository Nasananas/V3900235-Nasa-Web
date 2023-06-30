const express = require('express');
const app = express();
const PORT = 3000;
const { Pool } = require('pg');

// Konfigurasi koneksi ke PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'root',
  password: '',
  port: 5432,
});

// Mengizinkan parsing body request dalam format JSON
app.use(express.json());

// Menampilkan semua data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nama_tabel');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Menampilkan data berdasarkan id
app.get('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM nama_tabel WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Data tidak ditemukan' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
