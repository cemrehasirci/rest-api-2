# 📘 RESTful Course & User Management API

## 🚀 Proje Açıklaması

Bu proje, basit bir RESTful API üzerinden **kullanıcı yönetimi** (kayıt, giriş, silme, rol değiştirme) ve **kurs yönetimi** (ekleme, güncelleme, silme, arama) işlemlerini yapmanı sağlar.  
Veriler geçici olarak **bellekte (in-memory)** saklanır — yani veri tabanı kullanımı yoktur.

---

## 🛠️ Kullanılan Teknolojiler

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS

---


## 🔐 Yetkilendirme

- Yeni kullanıcılar **\`/register\`** endpointi ile kayıt olabilir.
- \`admin\` rolündeki kullanıcılar:
  - Herhangi bir kullanıcıyı silebilir
  - Başka bir kullanıcının rolünü değiştirebilir
- Uygulama başlarken sistemde **1 adet admin** tanımlıdır ve:
  - Silinemez
  - Rolü değiştirilemez

---

## 📌 .env Örneği

```js
PORT = 5000

SECRET_TOKEN = birgizlitoken
```

---


## 🔐 Token ile Korunan Endpointler

Endpointlerde **Authorization header** zorunludur:  

`Authorization: Bearer <JWT>`


---

## 👤 Varsayılan Admin

```json
{
  "email": "admin@admin.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## 📦 Projeyi Çalıştırmak

1. Bağımlılıkları yükle:
   ```bash
   npm install
   ```

2. Sunucuyu başlat:
   ```bash
   npm start
   ```

3. API şu adreste çalışır:
   ```
   http://localhost:5000
   ```

---
