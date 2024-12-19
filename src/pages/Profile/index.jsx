import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const photoProfile = useSelector((state) => state.auth.photoProfile);

  return (
    <>
      <div className="relative flex justify-between shadow-md mx-auto pt-20 pb-10 pl-8 max-w-screen-md container">
        <div className="flex md:gap-7">
          <div className="rounded-full w-[30vw] h-[30vw] overflow-hidden">
            <img src={photoProfile} alt="" className="size-full" />
          </div>
          <div className="flex flex-col flex-1 gap-3 my-auto p-6">
            <h1 className="font-semibold text-xl md:text-3xl">
              {user.username}
            </h1>
            <p className="text-sm md:text-base">{user.bio}</p>
          </div>
        </div>
        <div className="pr-6">
          <button
            onClick={() => navigate("/dashboard/profile/menu")}
            className="inline-flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-500 w-10 h-10 text-gray-500 text-sm dark:text-gray-400 transition-all focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}
