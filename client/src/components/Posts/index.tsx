import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AppState } from "../../reducers";
import { IPost } from "../../types/Post";
import Post from "./Post";

const Posts = () => {
  const posts = useSelector((state: AppState) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post: IPost) => (
        <Grid item key={post._id} xs={12} sm={6} md={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
