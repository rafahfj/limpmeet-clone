import { configureStore } from "@reduxjs/toolkit";
import blogs from "../reducer/blogs";
import auth from "../reducer/auth";

export default configureStore({
  reducer: {
    blogs: blogs,
    auth: auth,
  },
});
