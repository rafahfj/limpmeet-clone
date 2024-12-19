import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../config/redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../config/redux/reducer/auth";

export default function Login() {
  const directTo = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleIn = async (e) => {
    e.preventDefault();
    setErrors(""); // Reset error state
    dispatch(setError());

    let validationErrors = {};

    if (!validateEmail(input.email)) {
      setErrors("Email is not valid");
      return;
    }

    if (Object.keys(validateEmail).length === 0) {
      const { email, password } = input;
      const resultAction = await dispatch(handleLogin({ email, password }));

      if (handleLogin.fulfilled.match(resultAction)) {
      } else if (handleLogin.rejected) {
        console.log(resultAction.payload);
        setErrors(resultAction.payload);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="border-2 bg-primary shadow-2xl mx-auto my-10 p-8 rounded-3xl h-auto size-96">
      <h1 className="mb-4 font-bold text-3xl text-center">Login</h1>
      <form
        onSubmit={handleIn}
        className="border-2 mx-auto mb-4 p-4 rounded-xl w-80 h-auto"
      >
        <label htmlFor="email" className="block">
          <span className="block mb-1">email</span>
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={onChange}
            className="block border-2 mb-2 p-1 rounded-md w-full"
          />
        </label>
        <label htmlFor="password" className="block">
          <span className="block mb-1">password</span>
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={onChange}
            className="block border-2 mb-2 p-1 rounded-md w-full"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="block border-2 bg-primary shadow-md mx-auto my-2 px-3 p-1.5 rounded-lg font-semibold text-gray-950"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
      </form>
      <p>don't have an account?</p>
      <button
        onClick={() => directTo("/register")}
        className="font-semibold underline"
      >
        Register
      </button>
    </div>
  );
}
