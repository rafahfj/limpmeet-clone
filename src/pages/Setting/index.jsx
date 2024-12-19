import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Setting() {
  const navigate = useNavigate();

  const [mode, setMode] = useState();

  const handleMode = (checked) => {
    setMode(checked);
    console.log(checked);

    if (!mode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else if (mode) {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setMode(true);
    }
  }, []);

  return (
    <div className="top top-0 right-0 bottom-0 left-0 z-20 absolute bg-primary">
      <div className="top-0 right-0 left-0 fixed flex items-center gap-7 bg-secondary shadow-xl p-4">
        <button
          className="active:shadow-inner rounded-xl"
          onClick={() => navigate(-1)}
        >
          <h1 className="font-bold text-3xl">&#8678;</h1>
        </button>
        <h1 className="font-semibold text-xl">Setting</h1>
      </div>
      <div className="p-4 pt-24">
        <h1>Dark Mode</h1>
        <DarkModeSwitch onChange={handleMode} size={50} checked={mode} />
      </div>
    </div>
  );
}
