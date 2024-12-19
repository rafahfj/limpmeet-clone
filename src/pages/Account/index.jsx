import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const photoProfile = useSelector((state) => state.auth.photoProfile);

  return (
    <div className="top top-0 right-0 bottom-0 left-0 z-20 absolute bg-primary">
      <div className="bg-primary">
        <div className="top-0 right-0 left-0 fixed flex items-center gap-7 bg-secondary shadow-xl p-4">
          <button
            className="active:shadow-inner rounded-xl"
            onClick={() => navigate(-1)}
          >
            <h1 className="font-bold text-3xl">&#8678;</h1>
          </button>
          <h1 className="font-semibold text-xl">Account Setting</h1>
        </div>
        <div className="flex flex-col gap-5 p-4 lg:p-6 pt-16 lg:pt-20">
          <div className="flex flex-col justify-center items-center gap-2 pt-5">
            <div className="rounded-full w-2/5 max-w-52 overflow-hidden">
              <img src={photoProfile} alt="" />
            </div>
            <button
              onClick={() => navigate("/dashboard/account/change-picture")}
              className="text-blue-900"
            >
              Change Picture
            </button>
          </div>
          <div>
            <div className="flex justify-between p-1">
              <h1>Username</h1>
              <button
                onClick={() => navigate("/dashboard/account/change-username")}
                className="text-blue-900"
              >
                Change
              </button>
            </div>
            <p className="block bg-secondary p-2 rounded-md">{user.username}</p>
          </div>
          <div>
            <div className="flex justify-between p-1">
              <h1>Bio</h1>
              <button
                onClick={() => navigate("/dashboard/account/change-bio")}
                className="text-blue-900"
              >
                Change
              </button>
            </div>
            <p className="block bg-secondary p-2 rounded-md">
              {user?.bio ? user.bio : "none"}
            </p>
          </div>
          <div>
            <h1>Account Info</h1>
            <p className="block bg-secondary p-2 rounded-md">
              Created {user?.about ? user.about : "none"}
            </p>
          </div>
          <div>
            <button
              className="std-button"
              onClick={() => navigate("/dashboard/account/logout")}
            >
              Log Out
            </button>
          </div>
          <div className="relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
