import { updatePost, newPost } from "@/pages/api/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styles from "./PostForm.module.css";

const PostForm = ({ editPost, setEditPost }) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Pre-fill form fields when editing
  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setBody(editPost.body);
    }
  }, [editPost]);

  const {
    mutate: createPost,
    isError,
    isSuccess,
    error,
    reset: resetCreatePost,
  } = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTimeout(() => {
        resetCreatePost();
      }, 2000);
    },
  });

  const {
    mutate: editMutation,
    isError: editEror,
    isSuccess: editsuccess,
    error: editerrmsg,
    reset,
  } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = 1;

    if (editPost) {
      editMutation({ ...editPost, title, body });
    } else {
      createPost({ userId, title, body });
    }

    setTitle("");
    setBody("");
    setEditPost(null);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>{editPost ? "Edit Post" : "New Post"}</h3>
        <input
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="body"
          placeholder="Enter body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          {editPost ? "Update" : "Submit"}
        </button>
        {isError && <p style={{ color: "red" }}>{error.message}</p>}
        {editEror && <p style={{ color: "red" }}>{editerrmsg.message}</p>}
        {editsuccess && (
          <p style={{ color: "green" }}>Post updated successfully!</p>
        )}
        {isSuccess && (
          <p style={{ color: "green" }}>Post created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default PostForm;
