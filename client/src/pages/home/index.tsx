import { Container, Grid, Grow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { getPosts } from "../../actions/posts";
import Form from "../../components/Form";
import Posts from "../../components/Posts";
import makeStyles from "./styles/styles";

const Home = () => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
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
  );
};

export default Home;
