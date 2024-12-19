import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const directTo = useNavigate();

  return (
    <div className="block border-2 shadow-xl mx-auto my-28 p-5 rounded-lg w-1/2 min-w-96 text-center welcome">
      <h1 className="mb-4 font-bold text-2xl">Welcome to LimpMeet</h1>
      <p className="text-slate-600">Already have an account?</p>
      <button
        className="border-2 mb-4 p-1.5 rounded-md w-20 font-semibold"
        onClick={() => directTo("/login")}
      >
        Login
      </button>
      <p className="text-slate-600">Don't have any account?</p>
      <button
        className="border-2 mb-4 p-1.5 rounded-md w-20 font-semibold"
        onClick={() => directTo("/register")}
      >
        Register
      </button>
    </div>
  );
}
