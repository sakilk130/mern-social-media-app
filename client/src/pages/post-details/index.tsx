import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { commentAPost, fetchPostById, searchPosts } from "../../actions/posts";
import { AppState } from "../../reducers";
import makeStyles from "./styles/styles";

const PostDetails = () => {
  const { id } = useParams();
  const commentRef: any = useRef();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const classes = makeStyles();
  const [comment, setComment] = useState("");

  const user = useSelector((state: AppState) => state.auth);

  const { post, posts } = useSelector((state: any) => state.posts);

  useEffect(() => {
    if (post) {
      dispatch(
        searchPosts({
          query: "",
          tags: post?.tags?.join(","),
        })
      );
    }
  }, [post, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  const recommendedPosts = posts.filter((post: any) => post.id !== id);

  const commentHandler = () => {
    setComment("");
    dispatch(
      commentAPost({
        id,
        comment: `${user?.authData?.user?.name} : ${comment}`,
      })
    );
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Paper>
      {post && (
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
          <Grid item xs={12} md={6} lg={6} className={classes.image}>
            <img src={post?.selected_file} alt="post" height={"300px"} />
          </Grid>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} md={7} lg={7}>
              <div
                style={{
                  height: "200px",
                  overflowY: "scroll",
                }}
              >
                {post.comment &&
                  post?.comment.map((comment: any) => (
                    <Typography variant="body1">
                      <strong>{comment.split(":")[0]}</strong> :{" "}
                      {comment.split(":")[1]}
                    </Typography>
                  ))}
                <div ref={commentRef} />
              </div>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <Typography
                variant="h5"
                style={{
                  marginBottom: "10px",
                }}
              >
                Write a comment
              </Typography>
              <TextField
                label="Comment"
                variant="outlined"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
              />
              <Button
                type="submit"
                style={{
                  marginTop: "10px",
                }}
                variant="contained"
                color="primary"
                fullWidth
                disabled={!comment}
                onClick={commentHandler}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {recommendedPosts.length > 0 && (
        <>
          <div
            style={{
              padding: "0px 20px",
            }}
          >
            <Typography variant="h5">You might also like:</Typography>
            <hr />
          </div>
          <Grid
            container
            spacing={2}
            style={{
              padding: "20px",
            }}
          >
            {recommendedPosts.map((post: any) => (
              <Grid item xs={12} md={3} lg={3}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      navigate(`/posts/${post._id}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={post.selected_file}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {post.message}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default PostDetails;
