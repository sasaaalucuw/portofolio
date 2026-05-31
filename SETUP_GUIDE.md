# Portfolio Shafira Aini Saichu - Node.js + Express

Portfolio website yang sudah dikonversi dari PHP ke Node.js + Express dan siap untuk di-deploy ke Vercel.

## 📋 Daftar Isi
1. [Setup Local](#setup-local)
2. [Menjalankan Aplikasi](#menjalankan-aplikasi)
3. [Deploy ke Vercel](#deploy-ke-vercel)
4. [Troubleshooting](#troubleshooting)

---

## 🚀 Setup Local

### 1. Install Node.js
Pastikan Anda sudah install Node.js versi 18 ke atas. Download di: https://nodejs.org/

### 2. Clone/Buka Folder Proyek
```bash
cd c:/xampp/htdocs/portofolio
```

### 3. Install Dependencies
```bash
npm install
```

Ini akan menginstall:
- **express** - Web server
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **mysql2** - Database connection

### 4. Setup Database
Pastikan database MySQL sudah berjalan di XAMPP dan sudah membuat database dengan struktur berikut:

```sql
-- Database
CREATE DATABASE portofolio;
USE portofolio;

-- Table Projects
CREATE TABLE project (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_project VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  code VARCHAR(255),
  link_project VARCHAR(255),
  gambar VARCHAR(255)
);

-- Table Profile
CREATE TABLE profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255),
  deskripsi TEXT,
  pendidikan VARCHAR(255),
  universitas VARCHAR(255),
  skill TEXT,
  email VARCHAR(255),
  foto VARCHAR(255)
);

-- Insert Sample Data
INSERT INTO profile (nama, deskripsi, pendidikan, universitas, skill, email, foto)
VALUES (
  'Shafira Aini Saichu',
  'Mahasiswa D3 Teknologi Informasi yang memiliki minat pada UI/UX Design dan Web Development.',
  'D3',
  'Politeknik Harapan Bersama',
  'HTML, CSS, JavaScript, React, Node.js, UI/UX Design',
  'shafira@example.com',
  'profile.jpg'
);

INSERT INTO project (nama_project, deskripsi, code, link_project, gambar)
VALUES 
('Project 1', 'Deskripsi project 1', 'HTML, CSS, JS', 'https://github.com/...', 'project1.jpg'),
('Project 2', 'Deskripsi project 2', 'React, Node.js', 'https://github.com/...', 'project2.jpg');
```

### 5. Setup Environment Variables
File `.env` sudah dibuat. Pastikan isinya sesuai dengan database Anda:

```env
# Development
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portofolio

# Server Port
PORT=3000
```

---

## ▶️ Menjalankan Aplikasi

### Mode Pengembangan (Development)
Jalankan dengan auto-reload setiap kali file berubah:

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

### Mode Produksi
```bash
npm start
```

---

## 📤 Deploy ke Vercel

### Langkah 1: Push ke GitHub
Pastikan proyek Anda sudah di-push ke GitHub:

```bash
git add .
git commit -m "Convert portofolio to Node.js + Express"
git push origin main
```

### Langkah 2: Buat Akun Vercel
1. Buka https://vercel.com
2. Klik **Sign Up** dan pilih GitHub
3. Authorize Vercel dengan akun GitHub Anda

### Langkah 3: Import Proyek
1. Dashboard Vercel > **Add New** > **Project**
2. Pilih repository portofolio Anda
3. Vercel akan auto-detect sebagai Node.js project
4. Klik **Deploy**

### Langkah 4: Setup Environment Variables di Vercel
1. Buka **Settings** > **Environment Variables**
2. Tambahkan semua variabel dari `.env.example`:
   - `DB_HOST` - Host database Anda
   - `DB_USER` - Username database
   - `DB_PASSWORD` - Password database
   - `DB_NAME` - Nama database

3. Redeploy setelah menambah variables

### Langkah 5: Verifikasi
Setelah deploy berhasil, Vercel akan memberikan URL seperti: `https://portofolio-xxx.vercel.app`

Akses URL tersebut dan pastikan semuanya berjalan baik!

---

## ⚠️ Troubleshooting

### 1. "Cannot find module 'express'"
**Solusi:** Jalankan `npm install` untuk install dependencies

### 2. "Database connection failed"
**Kemungkinan penyebab:**
- Database MySQL belum berjalan
- Konfigurasi DB di `.env` salah
- Database belum dibuat

**Solusi:**
- Pastikan MySQL service berjalan
- Cek konfigurasi di `.env`
- Jalankan query SQL untuk membuat database (lihat Setup Database di atas)

### 3. "Port 3000 already in use"
**Solusi:** Ubah port di `.env`:
```env
PORT=3001
```

### 4. Asset/Images tidak muncul
**Pastikan struktur folder:**
```
portofolio/
├── public/
│   ├── style.css
│   └── (images harus di folder ini atau di folder assets yang di-serve)
├── assets/
│   ├── gambar1.jpg
│   ├── gambar2.jpg
│   └── ...
├── server.js
└── package.json
```

Kemudian di server.js, tambahkan:
```javascript
app.use(express.static(path.join(__dirname, 'assets')));
```

### 5. Deploy ke Vercel gagal
**Solusi:**
- Pastikan file `vercel.json` ada di root folder
- Pastikan `package.json` dan `server.js` ada
- Cek error log di Vercel Dashboard
- Pastikan `.env` tidak di-commit ke GitHub (`.gitignore` sudah atur ini)

---

## 📁 Struktur Folder

```
portofolio/
├── public/
│   └── style.css           # CSS stylesheet
├── assets/                 # Folder untuk images
│   ├── gambar1.jpg
│   └── gambar2.jpg
├── server.js               # Express server (file utama)
├── package.json            # Dependencies configuration
├── vercel.json             # Vercel configuration
├── .env                    # Environment variables (lokal)
├── .env.example            # Template env variables
├── .gitignore              # Files to ignore in Git
└── README.md               # File ini
```

---

## 🔗 Links Penting

- **Dokumentasi Express:** https://expressjs.com/
- **Vercel Docs:** https://vercel.com/docs
- **Node.js:** https://nodejs.org/

---

## 📝 Catatan Penting

1. **Git & GitHub:** Pastikan `.env` tidak di-commit (sudah di `.gitignore`)
2. **Database Production:** Untuk Vercel, Anda bisa gunakan layanan database cloud seperti:
   - Planetscale (MySQL)
   - Railway
   - Supabase (PostgreSQL)

3. **Images:** Letakkan semua gambar di folder `public/` atau `assets/` agar bisa di-akses dari Vercel

---

## ✨ Berikutnya?

Setelah berhasil deploy, Anda bisa:
- ✅ Customize design dan layout
- ✅ Tambah fitur (contact form, etc)
- ✅ Setup domain custom di Vercel
- ✅ Tambah CI/CD pipeline

---

**Selamat! Portfolio Anda sudah siap di-deploy ke Vercel! 🎉**

Jika ada pertanyaan, silakan buat issues atau hubungi support Vercel.
