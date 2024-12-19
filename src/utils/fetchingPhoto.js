export const fetchingPhhoto = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // Menggunakan Promise untuk menangani FileReader
    const base64data = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    return base64data;
  } catch (error) {
    console.error("Gagal mengambil gambar dari CDN:", error);
    return null;
  }
};
