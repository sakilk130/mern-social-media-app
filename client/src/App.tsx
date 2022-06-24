import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import Form from "./components/Form";
import makeStyles from "./styles";
import { useDispatch } from "react-redux";
import { Dispatch, useEffect } from "react";
import { getPosts } from "./actions/posts";

const App = () => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
            container
            alignItems="stretch"
            spacing={3}
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={7}>
              <Form />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
