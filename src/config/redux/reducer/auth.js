import { createSlice } from "@reduxjs/toolkit";
import {
  handleLogin,
  handleRegister,
  updateBio,
  updateUserPhoto,
  updateUsername,
} from "../action/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    photoProfile: "",
    error: null,
    loading: false,
    loadingPage: true,
  },
  reducers: {
    userLogout: (state) => {
      state = {
        user: null,
        error: null,
        loading: false,
      };
    },
    setError: (state) => {
      state.error = null;
    },
    setUser: (state, { payload }) => {
      const { username, email, uid, photoURL, bio, about } = payload;
      state.user = { username, email, uid, photoURL, bio, about };
    },
    setProfile: (state, action) => {
      state.photoProfile = action.payload;
    },
    setLoading: (state, { payload }) => {
      state.loadingPage = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.user.photoURL = action.payload;
        state.loading = false;
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.user.username = action.payload;
        state.loading = false;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateBio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.user.bio = action.payload;
        state.loading = false;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { userLogout, setError, setUser, setProfile, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
