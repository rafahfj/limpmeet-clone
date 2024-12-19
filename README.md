# LimpMeet

**Choose your language:**

[🇮🇩 Bahasa Indonesia](#bahasa) | [🇺🇸 English](#english)

---

## Bahasa

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

---

## English

# LimpMeet

LimpMeet is a platform for users to share their thoughts, opinions, or personal stories. This project aims to create a space for people to express themselves in a safe and welcoming environment.

## Features

1. **User Authentication**: Users can register and log in to ensure secure access.
2. **Profile Customization**: Users can edit their profile information, including username, profile picture, and bio. Profiles are visible to other users.
3. **Post Management**: Users can create and delete posts. Posts are ordered chronologically based on the time they were created.
4. **Dark Mode**: A night mode feature is available for users who prefer a darker interface.
5. **Persistent Login**: Login information is stored in cookies, reducing the need for repeated logins. Users will only need to log in again after an extended period of inactivity.
6. **View Other Profiles**: Users can explore the profiles of other authors.

## Technologies Used

- **React.js**: The foundation framework for this project.
- **TailwindCSS**: For efficient and modern styling.
- **Third-party Libraries**:
  - `redux`: State management.
  - `react-router`: Routing management.
  - `react-easy-crop`: Image cropping.
  - `react-responsive`: Responsive design.
- **Firebase**: Backend integration for database, authentication, and more.

## Getting Started

### Access the Web App

Simply visit [LimpMeet](https://limpmeet.vercel.app) to start using the platform.

### For Developers

1. Fork this repository and clone it to your local machine.
2. Set up a Firebase account and configure it in `config/firebase/index.js`.
3. Install the dependencies by running:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Access the app at `http://localhost:3000` in your browser.

## How to Use

1. **Register and Login**:

   - Register with a unique email and password (different from other websites for security).
   - Log in to access your account.
   - Once logged in, your session remains active until the cookie expires.

2. **Create Posts**:

   - Click on the "New Post" bar and write your content.

3. **Edit Profile**:

   - Navigate to the "Profile" bar and click on the menu (three lines near the profile section).
   - Select "Account" to update your username, bio, or profile picture.

4. **Switch to Dark Mode**:

   - Go to the "Settings" menu and enable night mode.

5. **Explore About Page**:
   - Learn more about the project and the developer in the "About" section.

## Target Audience

LimpMeet is designed for anyone who wants a space to share their stories or opinions. It emphasizes a text-first approach to encourage meaningful interactions.

## Roadmap

- Add features for liking posts.
- Implement a following system for users.

## Limitations

- Currently, the platform does not support advanced algorithms or post ranking.
- The design focuses on simplicity and functionality, making it suitable for text-based content sharing.

## Contributions

Contributions are welcome! Feel free to fork the repository and create a pull request with your improvements.

## Developer

- **Rafah Fajri Juwaeni**
  - [GitHub](https://github.com/rafahfj)
  - [LinkedIn](https://linkedin.com/rafahfj)

---

We hope you enjoy using LimpMeet! For feedback or issues, please reach out to the developer via GitHub.
