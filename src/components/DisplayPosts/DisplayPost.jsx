/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostFromDB,
  readAllPostFromDB,
} from "../../config/redux/action/blogs";
import { useEffect, useState } from "react";
import { setForm, setUpt } from "../../config/redux/reducer/blogs";
import { motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";
import { getDateUI } from "../../utils/getDateUI";
import ShowProfile from "../ShowUser/ShowUser";

export default function DisplayPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setMenu] = useState("");
  const [showProfile, setProfile] = useState("");

  const clientUid = useSelector((state) => state.auth.user.uid);
  const { allPosts, allUsers, status, error } = useSelector(
    (state) => state.blogs.get
  );

  useEffect(() => {
    const unsubscribe = async () => {
      await dispatch(readAllPostFromDB());
    };
    return () => unsubscribe();
  }, [dispatch]);

  const handleDelete = ({ key }) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus postingan ini?"
    );

    if (isConfirmed) {
      dispatch(deletePostFromDB(key));
      dispatch(readAllPostFromDB());
    }
  };

  const handleEdit = (data) => {
    dispatch(setForm({ nam: "title", val: data.title }));
    dispatch(setForm({ nam: "content", val: data.content }));
    dispatch(setForm({ nam: "isEdit", val: true }));
    navigate("/dashboard/home/newpost");
    dispatch(setUpt(data));
  };

  return (
    <motion.div
      transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
      className="mx-auto pt-20 pb-36 max-w-screen-sm text-primarytext cont-posts"
    >
      <button
        id="refresh"
        className="right-10 bottom-36 z-10 fixed border-2 bg-primary shadow-md mx-auto p-1.5 rounded-md w-14 font-semibold text-2xl text-primarytext"
        onClick={() => {
          dispatch(readAllPostFromDB());
        }}
      >
        &#8634;
      </button>
      <button
        id="to-top"
        className="right-10 bottom-20 z-10 fixed border-2 bg-primary shadow-md mx-auto p-1.5 rounded-md w-14 font-semibold text-2xl text-primarytext"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        &#8679;
      </button>
      {status === "loading" ? (
        <div className="top-0 right-0 bottom-0 left-0 z-10 fixed flex bg-slate-600/10 backdrop-blur-sm h-[100vh]">
          <h1 className="m-auto font-semibold text-2xl">Loading...</h1>
        </div>
      ) : null}
      {status === "rejected" ? <p>{error}</p> : <p></p>}
      {allPosts === "No data available" ? (
        <p>{allPosts}</p>
      ) : (
        allPosts
          ?.slice()
          .reverse()
          .map((post) => {
            const { postID, uid, title, content, date, lastDate } = post;
            const { username, photo, bio } = allUsers[uid];

            return (
              <div
                key={postID}
                className="border-2 bg-primary shadow-lg mb-3 p-4 rounded-sm card"
              >
                <div className="flex justify-between mb-2 pb-2 border-b-2">
                  <div
                    className="flex items-center gap-4"
                    onClick={() => setProfile(postID)}
                  >
                    <div className="rounded-full w-8 overflow-hidden">
                      <img src={photo} alt="" className="w-full" />
                    </div>
                    <h1 className="font-semibold">{username}</h1>
                  </div>
                  <div
                    className="space-y-2 active:shadow-inner p-2 rounded-md transition-all"
                    onClick={() => setMenu(postID)}
                  >
                    <span className="block bg-primaryborder w-6 h-0.5"></span>
                    <span className="block bg-primaryborder w-6 h-0.5"></span>
                    <span className="block bg-primaryborder w-6 h-0.5"></span>
                  </div>
                </div>
                {showProfile === postID && (
                  <ShowProfile
                    username={username}
                    photo={photo}
                    bio={bio}
                    onClose={setProfile}
                  />
                )}
                <div className="relative">
                  {showMenu === postID ? (
                    <div className="right-3 absolute bg-primary shadow-standard p-2 rounded-md w-28 h-32 transition-all -translate-y-14">
                      <div className="flex flex-col my-3 gap2">
                        {clientUid === uid ? (
                          <>
                            <button
                              className="block active:shadow-inner p-1 w-full transition-all"
                              onClick={() => handleEdit(post)}
                            >
                              Edit
                            </button>
                            <button
                              className="block active:shadow-inner p-1 w-full transition-all"
                              onClick={() => handleDelete(post)}
                            >
                              Delete
                            </button>
                          </>
                        ) : null}
                        <button
                          className="block active:shadow-inner p-1 w-full transition-all"
                          onClick={() => setMenu(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
                <p className="mb-1 font-semibold text-lg title">{title}</p>
                <p className="mb-1 content">{content}</p>
                <p className="font-normal text-slate-500 text-sm">
                  {getDateUI(date)}
                </p>
                {lastDate ? (
                  <p className="font-normal text-slate-500 text-sm">
                    edited {getDateUI(lastDate)}
                  </p>
                ) : null}
              </div>
            );
          })
      )}
      <Outlet />
    </motion.div>
  );
}
