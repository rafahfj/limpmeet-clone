import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUsername } from "../../config/redux/action/auth";

export default function ChangeUsername() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fungsi validasi username
  function validateInput(input) {
    const usernameRegex = /^[a-z][a-z0-9]*(?:[._][a-z0-9]+)*$/;

    if (input.length < 3 || input.length > 20) {
      return {
        isValid: false,
        message: "Username harus memiliki panjang antara 3 hingga 20 karakter.",
      };
    }

    if (!usernameRegex.test(input)) {
      return {
        isValid: false,
        message:
          "Username hanya boleh menggunakan huruf kecil, angka, underscore (_), atau titik (.), serta tidak boleh dimulai/diawali oleh angka, underscore, atau titik.",
      };
    }

    return { isValid: true };
  }

  const handleSubmit = async () => {
    const validation = validateInput(input);

    if (!validation.isValid) {
      setError(validation.message); // Tampilkan pesan error jika tidak valid
      return;
    }

    try {
      const res = await dispatch(updateUsername(input));
      if (res) {
        setSuccess(true);
        setError(""); // Reset error setelah sukses
      }
    } catch (err) {
      setError("Gagal memperbarui username. Silakan coba lagi.");
    }
  };

  return (
    <div className="popup-changes">
      {success ? (
        <div className="text-center">
          <h1>Username Updated</h1>
          <button onClick={() => navigate(-1)} className="std-button">
            Go Back
          </button>
        </div>
      ) : (
        <>
          <h1>Input New Username</h1>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(""); // Hapus pesan error saat mengetik ulang
            }}
            type="text"
            className="border-gray-300 p-2 border rounded-lg"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-5">
            <button className="std-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              className="std-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
