const express = require('express');
const app = express();
const PORT = 3000;

// Set view engine EJS
app.set('view engine', 'ejs');

// Route untuk halaman Profile
app.get('/profile', (req, res) => {
  const data = {
    nama: 'Nasa Ngainur Rohmah',
    nim: 'V3922034'
  };
  res.render('profile', { data });
});

// Route untuk halaman List Mahasiswa
app.get('/list-mahasiswa', (req, res) => {
  const data = require('./mahasiswa.json');
  res.render('list-mahasiswa', { data });
});

// Jalankan server pada port 3000
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
