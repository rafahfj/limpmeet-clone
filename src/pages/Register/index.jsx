import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../config/redux/action/auth";
import { setError } from "../../config/redux/reducer/auth";

export default function Register() {
  const directTo = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPW: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, []);

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  function validateUsername(input) {
    const usernameRegex = /^[a-z][a-z0-9]*(?:[._][a-z0-9]+)*$/;
    let message = "";

    if (input.length < 3 || input.length > 20) {
      message +=
        "Username harus memiliki panjang antara 3 hingga 20 karakter.\n";
    }

    if (!usernameRegex.test(input)) {
      message +=
        "Username hanya boleh menggunakan huruf kecil, angka, underscore (_), atau titik (.), serta tidak boleh dimulai/diawali oleh angka, underscore, atau titik.\n";
    }

    return message || "";
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    let errorMessage = "";

    // Minimal 8 karakter
    if (!/.{8,}/.test(password)) {
      errorMessage += "Kata sandi harus memiliki minimal 8 karakter.\n";
    }

    // Minimal satu huruf kecil
    if (!/[a-z]/.test(password)) {
      errorMessage +=
        "Kata sandi harus mengandung setidaknya satu huruf kecil.\n";
    }

    // Minimal satu huruf besar
    if (!/[A-Z]/.test(password)) {
      errorMessage +=
        "Kata sandi harus mengandung setidaknya satu huruf besar.\n";
    }

    // Minimal satu angka
    if (!/\d/.test(password)) {
      errorMessage += "Kata sandi harus mengandung setidaknya satu angka.\n";
    }

    // Minimal satu karakter khusus
    if (!/[!@#$%^&*]/.test(password)) {
      errorMessage +=
        "Kata sandi harus mengandung setidaknya satu karakter khusus (misalnya !@#$%^&*).\n";
    }

    return errorMessage || "";
  };

  const handleRegist = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    dispatch(setError());

    if (validateUsername(input.username)) {
      validationErrors.username = validateUsername(input.username);
    }

    if (!validateEmail(input.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (validatePassword(input.password)) {
      validationErrors.password = validatePassword(input.password);
    }

    if (input.password !== input.confirmPW) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length === 0) {
      const { email, password, username } = input;
      const resultAction = await dispatch(
        handleRegister({ email, password, username })
      );

      if (handleRegister.fulfilled.match(resultAction)) {
      } else if (handleRegister.rejected) {
        validationErrors.api = resultAction.payload;
        setErrors(validationErrors);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="border-2 bg-primary shadow-2xl mx-auto my-10 p-8 rounded-3xl h-auto size-96">
      <h1 className="mb-4 font-bold text-3xl text-center">Register</h1>
      <form
        onSubmit={handleRegist}
        className="border-2 mx-auto mb-4 p-4 rounded-xl w-80 h-auto"
      >
        <div>
          <label htmlFor="username">
            <span>username</span>
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={onChange}
              className="block border-2 mb-2 p-1 rounded-md w-full"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>email</span>
            <input
              type="text"
              placeholder="email"
              id="email"
              onChange={onChange}
              className="block border-2 mb-2 p-1 rounded-md w-full"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>password</span>
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={onChange}
              className="block border-2 mb-2 p-1 rounded-md w-full"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            <span>confirm password</span>
            <input
              type="password"
              id="confirmPW"
              placeholder="confirm password"
              onChange={onChange}
              className="block border-2 mb-2 p-1 rounded-md w-full"
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="block border-2 bg-primary shadow-md mx-auto my-5 px-3 p-1.5 rounded-lg font-semibold text-gray-950"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
      <p>Already have an account?</p>
      <button
        onClick={() => directTo("/login")}
        className="font-semibold underline"
      >
        Login
      </button>
    </div>
  );
}
