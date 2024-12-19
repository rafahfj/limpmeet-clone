import { useNavigate } from "react-router-dom";
import { signOut } from "../../config/redux/action/auth";
import { useState } from "react";

export default function PopupLogout() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const handleLogout = async () => {
    setloading(true);
    await signOut();
    navigate("/");
  };

  return (
    <div className="relative -top-96 flex flex-col items-center gap-7 bg-primary shadow-standard m-5 py-6 p-3 rounded-3xl h-1/2">
      <h1>Do you want to log out?</h1>
      <div className="flex gap-5">
        <button className="std-button" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button
          className="std-button"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}
