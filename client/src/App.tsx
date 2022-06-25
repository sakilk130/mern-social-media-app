import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Form from "./components/Form";
import Posts from "./components/Posts";
import makeStyles from "./styles";

const App = () => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.header} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src="/images/memories.png"
          alt="memories"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainGrid}
            container
            alignItems="stretch"
            spacing={3}
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
