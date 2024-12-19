import { createSlice } from "@reduxjs/toolkit";
import {
  deletePostFromDB,
  readAllPostFromDB,
  updatePostToDB,
  writePostToDB,
} from "../action/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    form: {
      title: "",
      content: "",
      isEdit: false,
    },
    up: {
      status: "idle",
      error: null,
    },
    get: {
      allPosts: [],
      status: "loading",
      error: null,
      allUsers: {},
    },
    update: {},
    delete: {
      status: null,
      error: null,
    },
  },
  reducers: {
    setForm: (state, { payload }) => {
      state.form = {
        ...state.form,
        [payload.nam]: payload.val,
      };
    },
    clrForm: (state) => {
      state.form = {
        title: "",
        content: "",
        isEdit: false,
      };
    },
    setUpt: (state, action) => {
      state.update = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readAllPostFromDB.pending, (state) => {
        state.get.status = "loading";
      })
      .addCase(readAllPostFromDB.fulfilled, (state, { payload }) => {
        state.get.status = "succeded";
        state.get.allPosts = payload.allPost;
        state.get.allUsers = payload.allUsers;
      })
      .addCase(readAllPostFromDB.rejected, (state, action) => {
        state.get.status = "rejected";
        state.get.error = action.payload;
      })
      .addCase(writePostToDB.pending, (state) => {
        state.up.status = "loading";
      })
      .addCase(writePostToDB.fulfilled, (state) => {
        state.up.status = "succeded";
      })
      .addCase(writePostToDB.rejected, (state, action) => {
        state.status = "rejected";
        state.up.error = action.payload;
      })
      .addCase(updatePostToDB.pending, (state) => {
        state.up.status = "loading";
      })
      .addCase(updatePostToDB.fulfilled, (state) => {
        state.up.status = "succeded";
      })
      .addCase(updatePostToDB.rejected, (state, action) => {
        state.status = "rejected";
        state.up.error = action.payload;
      })
      .addCase(deletePostFromDB.pending, (state) => {
        state.delete.status = "loading";
      })
      .addCase(deletePostFromDB.fulfilled, (state) => {
        state.delete.status = "succeded";
      })
      .addCase(deletePostFromDB.rejected, (state, action) => {
        state.status = "rejected";
        state.delete.error = action.payload;
      });
  },
});

export const { setForm, clrForm, setUpt } = blogSlice.actions;
export default blogSlice.reducer;
