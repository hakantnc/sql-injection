const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Veritabanı bağlantı ayarları
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sql-injection',
  password: 'admin', // BURAYI KENDI ŞİFRENİZLE DEĞİŞTİRİN
  port: 5432,
});

app.use(express.static('public')); 

// --- ZAFİYETLİ UÇ NOKTA (VULNERABLE ENDPOINT) ---
app.get('/search', async (req, res) => {
  const searchTerm = req.query.q; // Kullanıcıdan gelen arama metni

  // DİKKAT: Siber güvenlikte yapılmaması gereken en büyük hata!
  // Kullanıcı girdisi hiçbir filtrelemeden geçmeden doğrudan SQL sorgusuna yazılıyor.
  const query = `SELECT name, description, price FROM products WHERE name = '${searchTerm}'`;

  try {
    console.log("Çalıştırılan Sorgu: ", query); // Arka planda ne olduğunu görmek için logluyoruz
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    // Error-based SQLi için veri tabanı hatasını doğrudan ekrana basıyoruz
    res.status(500).send("Veritabanı Hatası: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`Zafiyetli laboratuvar http://localhost:${port} adresinde çalışıyor...`);
});