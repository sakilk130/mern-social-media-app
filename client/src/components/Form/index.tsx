import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import makeStyles from "./styles/styles";
import FileBase from "react-file-base64";

const Form = () => {
  const classes = makeStyles();

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6" align="center">
          Create a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
        />
        <TextField name="title" variant="outlined" label="Title" fullWidth />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
        />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} />
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
        <Button size="small" variant="contained" color="secondary" fullWidth>
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
