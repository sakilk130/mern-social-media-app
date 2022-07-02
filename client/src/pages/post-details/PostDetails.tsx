import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { fetchPostById, searchPosts } from "../../actions/posts";
import makeStyles from "./styles/styles";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const classes = makeStyles();

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
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions> */}
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
