# SEN0420 - Ethical Hacking: SQL Injection Project




# -----------------------------------
# YOU SHOULD DO THIS STATEMENTS FOR STARTING DEMO:
pip install -r requirements.txt
python vulnerable_app.py
python exploit_demo.py
# -----------------------------------






## Group Members
| Name | Student ID |
|------|------------|
| Hakan Tunç | 2100004302 |
| İlhan Berk Güven | 2200004709 |
| Burak Çam | 2200003720 |

## Project Topic: SQL Injection

SQL Injection (SQLi), web uygulamalarındaki en yaygın ve tehlikeli güvenlik açıklarından biridir. Bu açık, saldırganın kötü niyetli SQL sorgularını uygulama girişlerine enjekte ederek veritabanı üzerinde yetkisiz işlemler gerçekleştirmesine olanak tanır.

---

## Table of Contents
1. [What is SQL Injection?](#1-what-is-sql-injection)
2. [Types of SQL Injection](#2-types-of-sql-injection)
3. [How SQL Injection Works](#3-how-sql-injection-works)
4. [Real-World Impact](#4-real-world-impact)
5. [Demo: Vulnerable Application](#5-demo-vulnerable-application)
6. [Prevention Methods](#6-prevention-methods)
7. [Ethical Considerations](#7-ethical-considerations)
8. [References](#8-references)

---

## 1. What is SQL Injection?

SQL Injection, bir uygulamanın veritabanı sorgularını manipüle etmek için kullanıcı giriş alanlarının kötüye kullanılmasıdır. Bu saldırı türü, OWASP Top 10 listesinde yıllardır en kritik güvenlik açıkları arasında yer almaktadır.

### Key Characteristics:
- Uygulama, kullanıcı girdisini doğrudan SQL sorgusuna ekler
- Girdi yeterince doğrulanmaz veya sanitize edilmez
- Saldırgan veritabanına yetkisiz erişim sağlayabilir

---

## 2. Types of SQL Injection

### 2.1 In-Band SQLi (Classic)
- **Error-based SQLi**: Veritabanı hata mesajlarından bilgi toplama
- **Union-based SQLi**: UNION SQL operatörü ile farklı tablolardan veri çekme

### 2.2 Inferential SQLi (Blind)
- **Boolean-based Blind**: True/False yanıtlarına göre veri çıkarma
- **Time-based Blind**: Veritabanı yanıt süresine göre bilgi toplama

### 2.3 Out-of-Band SQLi
- Veritabanı sunucusunun farklı bir kanal (DNS, HTTP) üzerinden veri göndermesi

---

## 3. How SQL Injection Works

### Normal Login Query:
```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'secret123'
```

### SQL Injection Attack:
```
Username: admin' OR '1'='1
Password: (any)
```

### Resulting Query:
```sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'anything'
```

Bu sorgu her zaman true döner çünkü `'1'='1'` koşulu her zaman doğrudur.

---

## 4. Real-World Impact

### Notable SQL Injection Attacks:
- **TalkTalk (2015)**: 157 milyon müşteri verisi sızdırıldı
- **Equifax (2017)**: 147 milyon kişinin kişisel bilgileri çalındı
- **Sony Pictures (2011)**: 100 milyon+ hesap etkilendi

### Potential Damage:
- Veri hırsızlığı (kimlik bilgileri, finansal bilgiler)
- Veri manipülasyonu veya silinmesi
- Yetkisiz erişim ve sistem ele geçirme
- Yasal ve finansal sonuçlar

---

## 5. Demo: Vulnerable Application

### 5.1 Setup
```bash
pip install flask sqlite3
python vulnerable_app.py
```

### 5.2 Files Included:
- `vulnerable_app.py`: Kasıtlı olarak savunmasız bırakılmış web uygulaması
- `exploit_demo.py`: SQL Injection saldırısını gösteren exploit scripti
- `secure_app.py`: Güvenli versiyon (parametreli sorgular ile)

### 5.3 Demo Steps:
1. Savunmasız uygulamayı başlatın
2. Normal login deneyin
3. SQL Injection payload'ı ile bypass deneyin
4. Veritabanından veri çekmeyi gösterin
5. Güvenli versiyon ile karşılaştırın

---

## 6. Prevention Methods

### 6.1 Parameterized Queries (Prepared Statements)
```python
# UNSAFE
cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")

# SAFE
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
```

### 6.2 Input Validation
- Whitelist yaklaşımı kullanın
- Girdi tipini ve uzunluğunu kontrol edin
- Özel karakterleri escape edin

### 6.3 Least Privilege Principle
- Veritabanı hesaplarına minimum gerekli yetkileri verin
- Admin hesaplarını web uygulamalarından ayırın

### 6.4 Web Application Firewall (WAF)
- SQL Injection pattern'lerini tespit eden WAF kullanın
- Düzenli güncellemeler yapın

### 6.5 Regular Security Audits
- Kod incelemeleri yapın
- Otomatik güvenlik taramaları çalıştırın
- Penetrasyon testleri uygulayın

---

## 7. Ethical Considerations

### Important Notes:
- Bu proje sadece eğitim amaçlıdır
- SQL Injection saldırıları yasa dışıdır ve ciddi yasal sonuçları vardır
- Gerçek sistemlerde test yapmadan önce yazılı izin alınmalıdır
- Etik hacker'lar sistemleri korumak için çalışır, saldırmak için değil

### Legal Framework:
- TCK Madde 243-245: Bilişim alanındaki suçlar
- KVKK: Kişisel verilerin korunması
- Uluslararası siber suç sözleşmeleri

---

## 8. References

1. OWASP. (2023). SQL Injection. https://owasp.org/www-community/attacks/SQL_Injection
2. PortSwigger. Web Security Academy: SQL Injection. https://portswigger.net/web-security/sql-injection
3. CWE-89: SQL Injection. https://cwe.mitre.org/data/definitions/89.html
4. Stanford CS253: Web Security. https://web.stanford.edu/class/cs253/
5. NIST SP 800-53: Security and Privacy Controls

---

## Project Submission Details

- **Course**: SEN0420 - Ethical Hacking
- **Submission Date**: 22 May 2026, 18:00
- **Group**: 3 Members
- **Topic**: SQL Injection Attack and Prevention

---

*This project is prepared for educational purposes only. All demonstrations are performed in isolated test environments.*
"# sql-injection" 
