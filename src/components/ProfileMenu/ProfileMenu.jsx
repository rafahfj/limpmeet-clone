import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const navigate = useNavigate();

  return (
    <div className="top-0 right-0 bottom-0 left-0 z-20 absolute bg-slate-700/30">
      <div
        className="top-0 right-0 bottom-0 left-0 absolute"
        onClick={() => navigate(-1)}
      ></div>
      <div className="right-0 bottom-0 left-0 absolute bg-primary shadow-[0_0_10px_rgba(0,0,0,0.3)] p-5 rounded-t-3xl h-52">
        <ul>
          <li
            className="pm-list"
            onClick={() => navigate("/dashboard/account")}
          >
            <button>
              <p>Account</p>
            </button>
          </li>
          <li
            className="pm-list"
            onClick={() => navigate("/dashboard/setting")}
          >
            <button>Setting</button>
          </li>
          <li className="pm-list" onClick={() => navigate("/dashboard/about")}>
            <button>About</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
