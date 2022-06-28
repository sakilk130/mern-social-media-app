import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { deleteAPost, likeAPost } from "../../../actions/posts";
import { AppState } from "../../../reducers";
import { IPost } from "../../../types/Post";
import makeStyles from "./styles/styles";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

const Post = ({ post, setCurrentId }: { post: IPost; setCurrentId: any }) => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
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
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.created_at).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlayIcon}>
        <Button style={{ color: "white" }} size="small">
          <MoreHorizIcon
            fontSize="default"
            onClick={() => setCurrentId(post._id)}
          />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.title}
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={likeHandler}>
          <Likes />
        </Button>
        <Button size="small" color="primary" onClick={deleteHandler}>
          <DeleteIcon fontSize="small" />
          &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
