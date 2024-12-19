import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setProfile } from "../../config/redux/reducer/auth";

import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { readUserFromDB } from "../../config/redux/action/auth";
import {
  setLoading,
  setProfile,
  setUser,
} from "../../config/redux/reducer/auth";
import { fetchingPhhoto } from "../../utils/fetchingPhoto";

export default function Layout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loadingPage = useSelector((state) => state.auth.loadingPage);
  const local = localStorage.getItem("theme");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser === null) {
        dispatch(setLoading(false));
        return;
      }
      const { username, email, uid, photoURL, bio, about } =
        await readUserFromDB(currentUser);
      dispatch(setUser({ username, email, uid, photoURL, bio, about }));
      const photo = await fetchingPhhoto(photoURL);
      dispatch(setProfile(photo));
      if (local === "dark") {
        document.body.classList.add("dark");
      } else if (local === "light") {
        document.body.classList.add("light");
      } else {
        localStorage.setItem("theme", "light");
        document.body.classList.add("light");
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingPage) {
    return (
      <div className="relative flex h-[100vh]">
        <h1 className="m-auto font-semibold text-4xl">Loading...</h1>
      </div>
    );
  }

  if (user === null) {
    return (
      <>
        <Navigate to={"/welcome"} />
        <Outlet />
      </>
    );
  } else if (user) {
    return (
      <>
        <Navigate to={"/dashboard"} />
        <Outlet />
      </>
    );
  }
}
