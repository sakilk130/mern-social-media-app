import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { fetchPostById } from "../../actions/posts";
import makeStyles from "./styles/styles";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const { post } = useSelector((state: any) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  const classes = makeStyles();

  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4">{post?.title}</Typography>
          <div>
            {post.tags.map((tag: any) => (
              <Chip className={classes.tag} label={tag} color="secondary" />
            ))}
          </div>
          <Typography variant="body1">{post?.message}</Typography>
          <Typography variant="body1">Created By: {post?.name}</Typography>
          <Typography variant="body2">
            {moment(post?.created_at).fromNow()}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <img
            className={classes.image}
            src={post?.selected_file}
            alt="post"
            height={"300px"}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostDetails;
