import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { deleteAPost, likeAPost } from "../../../actions/posts";
import { AppState } from "../../../reducers";
import { IPost } from "../../../types/Post";
import makeStyles from "./styles/styles";

const Post = ({ post, setCurrentId }: { post: IPost; setCurrentId: any }) => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.auth);
  const deleteHandler = () => {
    dispatch(
      deleteAPost({
        id: post._id,
      })
    );
  };

  const likeHandler = () => {
    dispatch(
      likeAPost({
        id: post._id,
      })
    );
  };

  const Likes = () => {
    const isLiked = post.likes.find(
      (like: any) =>
        like === (user?.authData?.user?.id || user?.authData?.user?.googleId)
    );
    if (isLiked) {
      return (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{post.likes.length ? post.likes.length : ""}&nbsp;
          {post.likes.length > 1 ? "Likes" : "Like"} &nbsp;
        </>
      );
    } else {
      return (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length ? post.likes.length : ""}&nbsp;{" "}
          {post.likes.length > 1 ? "Likes" : "Like"} &nbsp;
        </>
      );
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selected_file ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
        onClick={() => {
          navigate(`/posts/${post._id}`);
        }}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.created_at).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlayIcon}>
        {(user?.authData?.user?.id || user?.authData?.user?.googleId) ===
          post.creator && (
          <Button style={{ color: "white" }} size="small">
            <MoreHorizIcon
              fontSize="default"
              onClick={() => setCurrentId(post._id)}
            />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        {post.tags.map((tag) => (
          <Chip label={tag} variant="outlined" color="primary" size="small" />
        ))}
      </div>
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.title}
      >
        {post.title}
      </Typography>
      <CardContent className={classes.message}>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={likeHandler}
          disabled={
            !(user?.authData?.user?.id || user?.authData?.user?.googleId)
          }
        >
          <Likes />
        </Button>
        {(user?.authData?.user?.id || user?.authData?.user?.googleId) ===
          post.creator && (
          <Button size="small" color="secondary" onClick={deleteHandler}>
            <DeleteIcon fontSize="small" />
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
