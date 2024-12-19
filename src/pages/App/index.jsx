//  Router
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// Elements
import Root from "../../route/root";
import Register from "../Register";
import Login from "../Login";
import Welcome from "../Welcome";
import Dashboard from "../Dashboard";
import PrivateRoute from "../../route/PrivateRoute/private";
import PrivateNotLog from "../../route/PrivateRoute/notLog";
import FormPost from "../../components/FormPost/FormPost";
import Profile from "../Profile";
import Account from "../Account";
import Setting from "../Setting";
import About from "../About";
import DisplayPost from "../../components/DisplayPosts/DisplayPost";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ChangePicture from "../../components/ChangPicture/ChangePicture";
import ChangeUsername from "../../components/ChangUsername/ChangeUsername";
import ChangeBio from "../../components/ChangeBio/ChangeBio";
import PopupLogout from "../../components/PopupLogout/popupLogout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/welcome",
          element: (
            <PrivateNotLog>
              <Welcome />
            </PrivateNotLog>
          ),
        },
        {
          path: "/register",
          element: (
            <PrivateNotLog>
              <Register />
            </PrivateNotLog>
          ),
        },
        {
          path: "/login",

          element: (
            <PrivateNotLog>
              <Login />
            </PrivateNotLog>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <Navigate to={"/dashboard/home"} />,
            },
            {
              path: "/dashboard/home",
              element: <DisplayPost />,
              children: [
                {
                  path: "/dashboard/home/newpost",
                  element: <FormPost />,
                },
              ],
            },
            {
              path: "/dashboard/profile",
              element: <Profile />,
              children: [
                {
                  path: "/dashboard/profile/menu",
                  element: <ProfileMenu />,
                },
              ],
            },
            {
              path: "/dashboard/account",
              element: <Account />,
              children: [
                {
                  path: "/dashboard/account/change-picture",
                  element: <ChangePicture />,
                },
                {
                  path: "/dashboard/account/change-username",
                  element: <ChangeUsername />,
                },
                {
                  path: "/dashboard/account/change-bio",
                  element: <ChangeBio />,
                },
                {
                  path: "/dashboard/account/logout",
                  element: <PopupLogout />,
                },
              ],
            },
            {
              path: "/dashboard/setting",
              element: <Setting />,
            },
            {
              path: "/dashboard/about",
              element: <About />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
