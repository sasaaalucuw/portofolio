# PANDUAN DEPLOY KE VERCEL - Langkah Demi Langkah

Portfolio Anda sudah dikonversi dari PHP ke **Node.js + Express** dan siap untuk di-deploy ke Vercel!

## 🎯 Checklist Sebelum Deploy

- [ ] File `package.json` sudah ada ✓
- [ ] File `server.js` sudah ada ✓
- [ ] File `vercel.json` sudah ada ✓
- [ ] Folder `public/` dengan `style.css` ✓
- [ ] File `.env` sudah dikonfigurasi ✓
- [ ] GitHub repository sudah di-setup ✓

---

## 📋 LANGKAH-LANGKAH DEPLOY

### **STEP 1: Setup di GitHub** (5 menit)

#### 1a. Initialize Git (jika belum)
```bash
cd c:\xampp\htdocs\portofolio
git init
git add .
git commit -m "Initial commit: Convert portofolio to Node.js"
```

#### 1b. Create Repository di GitHub
1. Buka https://github.com/new
2. Buat repository baru (nama: `portofolio` atau `portfolio-shafira`)
3. **JANGAN pilih "Initialize with README"**

#### 1c. Push ke GitHub
```bash
git remote add origin https://github.com/USERNAME/portofolio.git
git branch -M main
git push -u origin main
```

> **Replace USERNAME dengan username GitHub Anda!**

---

### **STEP 2: Setup di Vercel** (5 menit)

#### 2a. Buat Akun Vercel
1. Buka https://vercel.com
2. Klik **Sign Up**
3. Pilih **Continue with GitHub**
4. Authorize Vercel

#### 2b. Import Project
1. Di Vercel Dashboard, klik **Add New** > **Project**
2. Cari dan pilih repository `portofolio` Anda
3. Vercel otomatis akan detect sebagai Node.js project
4. **Klik Deploy** (biarkan settings default)

> ⏳ Deployment akan berjalan sekitar 2-5 menit

---

### **STEP 3: Setup Environment Variables** (3 menit)

Ini **SANGAT PENTING** agar database bisa terkoneksi!

1. Setelah deploy selesai, klik project > **Settings**
2. Di sidebar, pilih **Environment Variables**
3. Tambahkan variables berikut:

| Key | Value | Contoh |
|-----|-------|--------|
| `DB_HOST` | Host database Anda | `db.example.com` atau IP |
| `DB_USER` | Username MySQL | `root` |
| `DB_PASSWORD` | Password MySQL | `password123` |
| `DB_NAME` | Nama database | `portofolio` |

4. **Klik Save**
5. Kembali ke **Deployments** dan klik **Redeploy** button untuk apply variables

---

### **STEP 4: Verifikasi & Testing** (2 menit)

1. Tunggu redeploy selesai (status jadi "Ready")
2. Klik URL yang diberikan Vercel (misal: `https://portofolio-abc.vercel.app`)
3. Cek apakah:
   - ✅ Halaman loading dengan benar
   - ✅ Style CSS tampil (bukan plain HTML)
   - ✅ Navigasi bekerja (Home, Projects, Profile)
   - ✅ Data dari database muncul

---

## 🔗 URL Hasil Deploy

Setelah selesai, Anda akan mendapat URL seperti:

```
https://portofolio-xxxxxxxxxx.vercel.app
```

**Simpan URL ini!** Ini adalah link portfolio Anda yang bisa dibagikan ke orang lain.

---

## 🔄 Update Portfolio di Masa Depan

Setiap kali Anda membuat perubahan:

1. **Di komputer lokal:**
```bash
git add .
git commit -m "Update: Deskripsi perubahan Anda"
git push origin main
```

2. **Vercel otomatis akan:**
   - Detect perubahan
   - Redeploy aplikasi
   - Tidak perlu action manual!

---

## ⚠️ Troubleshooting

### ❌ "Database connection failed" di Vercel

**Penyebab:** Environment variables belum di-setup atau database tidak bisa diakses dari internet.

**Solusi:**
1. Pastikan sudah tambah 4 environment variables di Vercel
2. Pastikan database Anda bisa diakses dari luar (public/remote accessible)
3. Jika menggunakan localhost, Vercel tidak bisa connect. Gunakan database cloud seperti:
   - **Planetscale** (MySQL) - https://planetscale.com
   - **Railway** - https://railway.app
   - **Supabase** (PostgreSQL) - https://supabase.com

### ❌ "CSS tidak muncul" atau halaman terlihat plain

**Solusi:**
- Pastikan file `public/style.css` ada dan ter-upload ke GitHub
- Buka DevTools (F12) > Console dan cek ada error tidak
- Redeploy dari Vercel Dashboard

### ❌ "404 Not Found" di route `/project` atau `/profile`

**Penyebab:** Server tidak running dengan benar.

**Solusi:**
1. Buka Vercel Dashboard > Deployments > klik deployment yang failed
2. Lihat **Logs** untuk melihat error
3. Fix error di local, push ke GitHub, Vercel akan otomatis redeploy

---

## 📚 Tambahan: Database Cloud Setup (Optional)

Jika Anda ingin menggunakan database cloud (recommended):

### Menggunakan **Planetscale** (Rekomendasi)

1. Buka https://planetscale.com dan buat akun
2. Buat database baru
3. Dapatkan connection string (akan terlihat seperti):
   ```
   mysql://username:password@db.planetscale.com/portofolio?ssl={"rejectUnauthorized":true}
   ```
4. Update variable di Vercel dengan informasi dari Planetscale

---

## 🎉 Selamat!

Portfolio Anda sekarang **live di internet** dan bisa diakses dari mana saja! 

**Next steps:**
- ✅ Share URL ke teman/keluarga
- ✅ Tambah ke LinkedIn/CV Anda
- ✅ Terus update dengan project baru

---

**Butuh bantuan?** Hubungi Vercel Support atau baca docs mereka: https://vercel.com/docs
