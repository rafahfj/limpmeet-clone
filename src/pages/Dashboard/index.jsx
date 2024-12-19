import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const usnm = useSelector((state) => state.auth.user.username);
  const photoProfile = useSelector((state) => state.auth.photoProfile);

  useEffect(() => {});

  return (
    <main className="border-primaryborder bg-primary text-primarytext transition-colors duration-500">
      <nav className="top-0 right-0 left-0 z-20 fixed flex flex-row justify-between bg-secondary shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)] p-3 h-14">
        <div className="">
          <h1 className="font-bold text-lg">LimpMeet</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-md">{usnm}</p>
          <div className="rounded-full w-8 overflow-hidden">
            <img src={photoProfile} alt="" className="w-full" />
          </div>
        </div>
      </nav>

      <Outlet />

      <nav className="right-0 bottom-0 left-0 z-10 fixed flex bg-secondary shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)] h-14">
        <ul className="flex flex-auto text-center">
          <li className="flex flex-1">
            <button
              onClick={() => {
                pathname !== "/dashboard/home"
                  ? navigate("/dashboard/home")
                  : window.scrollTo(0, 0);
              }}
              className="hover:border-2 hover:shadow-md active:shadow-none m-auto p-3 rounded-md font-semibold text-primarytext cursor-pointer"
            >
              Home
            </button>
          </li>
          <li className="flex flex-1">
            <button
              onClick={() => {
                pathname === "/dashboard/home/newpost"
                  ? navigate("/dashboard/home")
                  : navigate("/dashboard/home/newpost");
              }}
              className="hover:border-2 hover:shadow-md active:shadow-none m-auto p-3 rounded-md font-semibold text-primarytext cursor-pointer"
            >
              New Post
            </button>
          </li>
          <li className="flex flex-1">
            <button
              onClick={() => {
                if (
                  pathname === "/dashboard/home/" ||
                  "/dashboard/home/newpost"
                ) {
                  navigate("/dashboard/profile");
                }
              }}
              className="hover:border-2 hover:shadow-md active:shadow-none m-auto p-3 rounded-md font-semibold text-primarytext cursor-pointer"
            >
              Profile
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
