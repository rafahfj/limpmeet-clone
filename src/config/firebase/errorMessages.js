// src/firebaseErrorMessages.js
export function getFriendlyErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email ini sudah digunakan. Silakan gunakan email lain.";
    case "auth/invalid-email":
      return "Format email tidak valid. Silakan masukkan email yang benar.";
    case "auth/user-not-found":
      return "Pengguna tidak ditemukan. Silakan periksa kembali email Anda.";
    case "auth/wrong-password":
      return "Kata sandi yang Anda masukkan salah. Silakan coba lagi.";
    case "auth/weak-password":
      return "Kata sandi terlalu lemah. Silakan gunakan kata sandi yang lebih kuat.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
    case "auth/operation-not-allowed":
      return "Operasi ini tidak diizinkan. Silakan hubungi administrator.";
    case "auth/invalid-action-code":
      return "Kode aksi tidak valid atau sudah kadaluarsa.";
    case "auth/account-exists-with-different-credential":
      return "Akun sudah ada dengan kredensial yang berbeda. Silakan coba login dengan metode yang berbeda.";
    case "auth/requires-recent-login":
      return "Untuk keamanan, silakan login ulang sebelum melakukan operasi ini.";
    case "auth/network-request-failed":
      return "Koneksi jaringan gagal. Silakan periksa koneksi internet Anda dan coba lagi.";
    case "auth/invalid-credential":
      return "Kredensial yang diberikan tidak valid. Silakan periksa dan coba lagi.";
    case "auth/invalid-verification-code":
      return "Kode verifikasi tidak valid. Silakan periksa dan coba lagi.";
    case "auth/invalid-verification-id":
      return "ID verifikasi tidak valid. Silakan coba ulang proses verifikasi.";
    case "auth/session-cookie-expired":
      return "Sesi telah kadaluarsa. Silakan login kembali.";
    case "auth/quota-exceeded":
      return "Kuota layanan terlampaui. Silakan coba lagi nanti.";
    case "auth/app-not-authorized":
      return "Aplikasi ini tidak diizinkan untuk menggunakan layanan Firebase Authentication.";
    case "auth/expired-action-code":
      return "Kode aksi sudah kadaluarsa. Silakan coba lagi.";
    case "auth/invalid-api-key":
      return "Kunci API yang digunakan tidak valid. Silakan periksa konfigurasi Firebase Anda.";
    case "auth/missing-email":
      return "Email tidak boleh kosong. Silakan masukkan email Anda.";
    default:
      return "Terjadi kesalahan. Silakan coba lagi atau hubungi dukungan.";
  }
}
