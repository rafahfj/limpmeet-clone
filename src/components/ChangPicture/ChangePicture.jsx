import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPhoto } from "../../config/redux/action/auth";
import { setProfile } from "../../config/redux/reducer/auth";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [imageSrc, setImageSrc] = useState(null); // Gambar yang diunggah
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Posisi crop
  const [zoom, setZoom] = useState(1); // Zoom untuk cropping
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Area crop
  const [isModalOpen, setIsModalOpen] = useState(false); // Kontrol modal
  const [finalImage, setImage] = useState(null);
  const [isSuccess, setSuccess] = useState(false);

  // Fungsi untuk menangani unggahan file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Menyimpan gambar ke state
        setIsModalOpen(true); // Membuka modal
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk menangkap area cropped
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Fungsi untuk menyelesaikan cropping
  const handleCropComplete = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setImageSrc(null); // Reset state
      setIsModalOpen(false); // Tutup modal
      setImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpload = async () => {
    const res = await dispatch(updateUserPhoto(finalImage));
    if (res.type === "auth/updatePhoto/fulfilled") {
      setSuccess(true);
      const response = await fetch(res.payload);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        dispatch(setProfile(base64data));
      };
    }
  };

  return (
    <div className="popup-changes">
      {/* Input untuk mengunggah file */}
      {isSuccess ? (
        <div className="text-center">
          <h1>Photo Profile Updated</h1>
          <button onClick={() => navigate(-1)} className="std-button">
            Go Back
          </button>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block border-gray-300 bg-gray-50 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full max-w-md text-gray-900 text-sm cursor-pointer focus:outline-none"
          />
          <>
            {finalImage && (
              <div className="w-[35vh]">
                <img
                  src={URL.createObjectURL(finalImage)}
                  alt=""
                  className="m-auto w-full"
                />
              </div>
            )}
          </>
          <>
            {/* Modal untuk cropping */}
            {isModalOpen && (
              <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
                  <div className="relative w-full h-80">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape={"round"}
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  {/* Kontrol untuk zoom dan tombol aksi */}
                  <div className="flex flex-col gap-4 mt-4">
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(e.target.value)}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-400 font-medium text-gray-700 text-sm focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCropComplete}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 font-medium text-sm text-white focus:outline-none"
                      >
                        Crop & Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
          <div className="flex gap-5">
            <button
              onClick={() => navigate(-1)}
              className="std-button"
              disabled={loading}
            >
              Cancel
            </button>
            {finalImage && (
              <button
                onClick={handleUpload}
                className="std-button"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
