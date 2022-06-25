import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import makeStyles from "./styles/styles";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../actions/posts";
import { Dispatch } from "redux";
import { IPostFormData } from "../../types/Post";

const Form = () => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const [formData, setFormData] = useState<IPostFormData>({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selected_file: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewPost(formData));
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      creator: "",
      title: "",
      message: "",
      tags: "",
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
          Create a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={formData.creator}
          onChange={(e) =>
            setFormData({ ...formData, creator: e.target.value })
          }
        />
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
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
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
          Submit
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
