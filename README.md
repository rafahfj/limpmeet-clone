# LimpMeet

LimpMeet adalah sebuah platform sosial media yang dirancang untuk memberikan pengguna tempat untuk curhat atau berbagi pendapat dan pandangan. Proyek ini bertujuan menciptakan ruang yang nyaman bagi pengguna untuk berinteraksi secara aman dan ramah.

## Fitur Utama

1. **Registrasi dan Login**:

   - Menjaga keamanan akses dengan autentikasi pengguna.
   - Informasi login pengguna disimpan dalam cookie sehingga tidak perlu login ulang setiap kali mengakses, kecuali setelah jangka waktu tertentu.

2. **Pengelolaan Profil**:

   - Pengguna dapat mengganti foto profil, username, dan bio.
   - Profil dapat dilihat oleh pengguna lain.

3. **Postingan**:

   - Pengguna dapat menambahkan dan menghapus postingan.
   - Postingan diurutkan berdasarkan waktu penulisan.

4. **Night Mode**:

   - Memungkinkan pengguna untuk mengganti tampilan menjadi gelap bagi kenyamanan visual.

5. **Responsif**:
   - Desain yang responsif untuk digunakan di berbagai perangkat.

## Teknologi yang Digunakan

- **Frontend**: React.js
- **Styling**: TailwindCSS
- **Third-party Libraries**:
  - Redux
  - React Router
  - React Easy Crop
  - React Responsive
- **Backend**: Firebase

## Cara Instalasi dan Penggunaan

### **Untuk Pengguna Umum**

Cukup kunjungi website [limpmeet.vercel.app](https://limpmeet.vercel.app) untuk langsung menggunakan layanan.

### **Untuk Developer**

1. **Persiapan Firebase**:

   - Buat akun Firebase.
   - Konfigurasikan Firebase di proyek Anda dengan memasukkan detail di file `config/firebase/index.js`.

2. **Clone Proyek**:

   ```bash
   git clone https://github.com/rafahfj/limpmeet.git
   cd limpmeet
   ```

3. **Instal Dependencies**:

   ```bash
   npm install
   ```

4. **Jalankan Proyek**:
   ```bash
   npm start
   ```

## Cara Menggunakan

1. **Daftar dan Login**:

   - Daftar untuk pertama kali dengan menggunakan email dan password (disarankan berbeda dari website lain).
   - Login untuk sesi berikutnya. Informasi login akan tersimpan.

2. **Membuat Postingan**:

   - Klik tombol **New Post** di navbar, tuliskan konten yang ingin diposting, dan klik **Submit**.

3. **Mengelola Profil**:

   - Akses menu **Account** di halaman profil untuk mengganti foto, username, dan bio.

4. **Mengubah Tema**:

   - Gunakan menu **Setting** untuk mengaktifkan atau menonaktifkan dark mode.

5. **Informasi Tambahan**:
   - Klik menu **About** untuk mengetahui lebih lanjut tentang proyek ini.

## Target Pengguna

Proyek ini ditujukan untuk siapa saja yang ingin tempat bercerita dan berbagi pandangan, terutama bagi mereka yang mencari platform yang mengutamakan teks dan kesederhanaan.

## Kredit

- **Pengembang**: Rafah Fajri Juwaeni
  - [GitHub](https://github.com/rafahfj)
  - [LinkedIn](https://linkedin.com/in/rafahfj)

## Catatan Tambahan

- Rencana pengembangan ke depan:
  - Fitur **Like** untuk setiap postingan.
  - Fitur **Following** untuk mengikuti pengguna lain.
