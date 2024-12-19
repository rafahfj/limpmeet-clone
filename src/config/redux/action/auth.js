import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database, storage } from "../../firebase";
import { getFriendlyErrorMessage } from "../../firebase/errorMessages";
import { child, get, ref, set } from "firebase/database";
import {
  getDownloadURL,
  uploadBytes,
  ref as StorageRef,
} from "firebase/storage";
import { getDate } from "../../../utils/getDate";

export const handleRegister = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: username });
      await updateProfile(user, {
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/raf-social-media.appspot.com/o/profileImage%2Fdefault.jpg?alt=media&token=6af19de7-6848-4fa2-8be8-011e687e72d9",
      });
      const date = getDate();
      await writeUserToDB(user, password, { bio: "none", about: date });
      const dataUser = await readUserFromDB(user);
      return {
        username: dataUser.username,
        email: dataUser.email,
        uid: dataUser.uid,
        bio: dataUser.bio,
        about: dataUser.about,
        photoURL: dataUser.photoURL,
      };
    } catch (error) {
      return rejectWithValue(getFriendlyErrorMessage(error.code));
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const dataUser = await readUserFromDB(user);

      return {
        username: dataUser.username,
        email: dataUser.email,
        uid: dataUser.uid,
        photoURL: dataUser.photoURL,
        bio: dataUser.bio,
        about: dataUser.about,
      };
    } catch (error) {
      return rejectWithValue(getFriendlyErrorMessage(error.code));
    }
  }
);

export const updateUserPhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (file, { rejectWithValue }) => {
    const user = auth.currentUser;
    try {
      // Memanggil fungsi uploadFile
      const downloadURL = await uploadFile({ file, type: "profileImage" });
      updateProfile(user, { photoURL: downloadURL });
      await set(ref(database, `users/${user.uid}/photoURL/`), downloadURL);
      const dataUser = await readUserFromDB(user);
      return dataUser.photoURL;
    } catch (error) {
      console.error("Gagal mengunggah file:", error);
      return rejectWithValue(
        error.message || "Terjadi kesalahan saat mengunggah file."
      );
    }
  }
);

export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async (username, { rejectWithValue }) => {
    const user = auth.currentUser;
    console.log(user);
    try {
      await updateProfile(user, { displayName: username });
      await set(ref(database, `users/${user.uid}/username/`), username);
      const data = await readUserFromDB(user);

      return data.username;
    } catch (error) {
      return rejectWithValue(
        error.message || "Terjadi kesalahan saat mengunggah file."
      );
    }
  }
);
export const updateBio = createAsyncThunk(
  "auth/updateBio",
  async (bio, { rejectWithValue }) => {
    const user = auth.currentUser;
    try {
      await set(ref(database, `users/${user.uid}/bio/`), bio);
      const data = await readUserFromDB(user);
      return data.bio;
    } catch (error) {
      return rejectWithValue(
        error.message || "Terjadi kesalahan saat mengunggah file."
      );
    }
  }
);

export const uploadFile = async ({ file, type }) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Pengguna tidak ditemukan. Silakan login terlebih dahulu.");
  }
  if (!file || !type) {
    throw new Error(
      "File atau tipe tidak valid. Pastikan semua parameter terisi."
    );
  }

  try {
    const sgRef = StorageRef(storage, `${type}/${user.uid}`);
    const snapshot = await uploadBytes(sgRef, file, {
      contentType: "image/jpeg",
    });

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengunggah file:", error);
    throw new Error("Gagal mengunggah file. Silakan coba lagi.");
  }
};

const writeUserToDB = (
  { displayName, email, uid, photoURL },
  password,
  { bio, about }
) => {
  set(ref(database, "users/" + uid), {
    email,
    username: displayName,
    uid,
    photoURL,
    password,
    bio,
    about,
  });
};

export const readUserFromDB = async ({ uid }) => {
  const dbRef = ref(database);
  return await get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      return error;
    });
};

export const signOut = () => {
  auth.signOut();
};
