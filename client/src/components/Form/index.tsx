import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { FormEvent, useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createNewPost, updateAPost } from "../../actions/posts";
import { AppState } from "../../reducers";
import { IPost, IPostFormData } from "../../types/Post";
import makeStyles from "./styles/styles";

const Form = ({ currentId, setCurrentId }: any) => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  const [formData, setFormData] = useState<IPostFormData>({
    title: "",
    message: "",
    tags: [],
    selected_file: "",
  });

  const post = useSelector((state: AppState) =>
    currentId ? state.posts.find((post: IPost) => post._id === currentId) : null
  );

  useEffect(() => {
    if (post) setFormData(post);
  }, [post]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updateAPost({
          id: currentId,
          formData,
        })
      );
    } else {
      dispatch(createNewPost({ ...formData, name: user?.user?.name }));
    }
    clearForm();
  };

  const clearForm = () => {
    setCurrentId(null);
    setFormData({
      title: "",
      message: "",
      tags: [],
      selected_file: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" align="center">
          {currentId ? "Update" : "Create"} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={formData.tags}
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: any) =>
              setFormData({ ...formData, selected_file: base64 })
            }
          />
        </div>
        <Button
          className={classes.submit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {currentId ? "Update" : "Create"}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          fullWidth
          onClick={clearForm}
        >
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
