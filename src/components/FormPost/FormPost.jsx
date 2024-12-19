import {
  readAllPostFromDB,
  updatePostToDB,
  writePostToDB,
} from "../../config/redux/action/blogs";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../utils/getDate";
import { clrForm, setForm } from "../../config/redux/reducer/blogs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function FormPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, uid } = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.blogs.up.status);
  const { title, content, isEdit } = useSelector((state) => state.blogs.form);
  const { postID, date, key } = useSelector((state) => state.blogs.update);

  const writePost = () => {
    const postID = new Date().getTime().toString();
    const date = new Date().toISOString();
    dispatch(writePostToDB({ postID, title, content, username, date, uid }));
    dispatch(readAllPostFromDB());
  };

  const editPost = () => {
    const lastDate = getDate();
    dispatch(
      updatePostToDB({
        key,
        postID,
        title,
        content,
        username,
        date,
        lastDate,
        uid,
      })
    );
    dispatch(readAllPostFromDB());
  };

  const handleCancel = () => {
    dispatch(clrForm());
  };

  const onSubmit = () => {
    if (isEdit) {
      editPost();
      dispatch(clrForm());
    } else {
      writePost();
      dispatch(clrForm());
    }
    navigate(-1);
  };

  return (
    <motion.section
      className={`fixed 
      bottom-14
       p-5 bg-primary z-10 rounded-t-3xl shadow-md border-2  w-1/2 min-w-96 max-w-2xl right-1/2 translate-x-1/2`}
    >
      <button
        onClick={() => {
          navigate("/dashboard/home");
        }}
        className="block float-right px-2 text-2xl text-slate-500 hover:text-primaryText active:text-primaryText -translate-y-4 translate-x-3"
      >
        x
      </button>
      <h1 className="mb-1 font-extrabold text-3xl text-primarytext">
        New Post
      </h1>
      <div>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={({ target }) =>
            dispatch(setForm({ val: target.value, nam: target.name }))
          }
          value={title}
          className="block border-2 mb-4 p-1 rounded-md w-full h-10 text-slate-900"
        />
        <textarea
          name="content"
          placeholder="content"
          onChange={({ target }) =>
            dispatch(setForm({ val: target.value, nam: target.name }))
          }
          value={content}
          className="block border-2 mb-4 p-1 rounded-md w-full h-32 text-slate-900"
        ></textarea>
      </div>
      <div className="flex flex-auto justify-center">
        <button
          className="border-2 bg-primary shadow-md mr-3 p-1.5 rounded-md font-bold text-primarytext"
          onClick={onSubmit}
          disabled={loading === "loading"}
        >
          {loading === "loading" ? "Loading..." : isEdit ? "Update" : "Submit"}
        </button>
        {isEdit ? (
          <button
            className="border-2 bg-secondary shadow-md p-1.5 rounded-md font-bold text-primarytext"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </motion.section>
  );
}
