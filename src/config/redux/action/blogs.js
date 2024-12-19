import { createAsyncThunk } from "@reduxjs/toolkit";
import { child, get, push, ref, remove, set } from "firebase/database";
import { database } from "../../firebase";
import { extractUniqueKeys } from "../../../utils/extractKeyObj";
import { readUserFromDB } from "./auth";
import { fetchingPhhoto } from "../../../utils/fetchingPhoto";

export const writePostToDB = createAsyncThunk(
  "blogs/writePostToDB",
  async ({ postID, title, username, content, date, uid }) => {
    console.log(content);
    try {
      await push(ref(database, "posts/"), {
        postID,
        title,
        content,
        date,
        username,
        uid,
      });
    } catch (err) {
      return err;
    }
  }
);

export const readAllPostFromDB = createAsyncThunk(
  "blogs/readPostFromDB",
  async () => {
    const dbRef = ref(database);
    try {
      const res = await get(child(dbRef, "posts/"));
      if (res.exists()) {
        const allPosts = [];
        Object.keys(res.val()).forEach((key) => {
          allPosts.push({
            key,
            ...res.val()[key],
          });
        });

        const allUsers = {};
        const userPromises = extractUniqueKeys(allPosts, "uid").map(
          async (uid) => {
            const user = await readUserFromDB({ uid });
            const { username, photoURL, bio } = user;
            const photo = await fetchingPhhoto(photoURL);
            allUsers[uid] = { username, photo, bio };
          }
        );
        await Promise.all(userPromises);

        return { allPost: allPosts, allUsers };
      } else {
        return { allPost: [], allUsers: {} };
      }
    } catch (err) {
      console.error("Error fetching data from database:", err);
      return { error: err.message };
    }
  }
);

export const updatePostToDB = createAsyncThunk(
  "blogs/updatePostToDB",
  async ({ key, postID, title, username, content, date, lastDate, uid }) => {
    await set(ref(database, `posts/${key}`), {
      postID,
      title,
      content,
      date,
      lastDate,
      username,
      uid,
    });
  }
);

export const deletePostFromDB = createAsyncThunk(
  "blogs/deletePostFromDB",
  async (key) => {
    await remove(ref(database, `posts/${key}`));
  }
);
