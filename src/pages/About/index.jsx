import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="top top-0 right-0 bottom-0 left-0 z-20 absolute bg-primary">
      <div className="top-0 right-0 left-0 fixed flex items-center gap-7 bg-secondary shadow-xl p-4">
        <button
          className="active:shadow-inner rounded-xl"
          onClick={() => navigate(-1)}
        >
          <h1 className="font-bold text-3xl">&#8678;</h1>
        </button>
        <h1 className="font-semibold text-xl">About</h1>
      </div>
      <div className="p-5 pt-28">
        <h1 className="font-semibold text-xl">
          Developed by{" "}
          <a
            className="text-blue-800"
            href="https://rafahfajrijuwaeni.vercel.app"
          >
            Rafah Fajri Juwaeni
          </a>
        </h1>
        <h1>Copyright &copy; 2024</h1>
      </div>
    </div>
  );
}
