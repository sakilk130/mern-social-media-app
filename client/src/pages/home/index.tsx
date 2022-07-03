import {
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { getPosts, searchPosts } from "../../actions/posts";
import Form from "../../components/Form";
import Posts from "../../components/Posts";
import makeStyles from "./styles/styles";
import Paginate from "../../components/Paginate";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = makeStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const query = useQuery();
  const page: any = query.get("page") || 1;
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState(null);
  const [tags, setTags] = useState<any>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getPosts(page));
  }, [currentId, dispatch]);

  const handleAddChip = (chip: any) => {
    setTags((prevTags: any) => [...prevTags, chip]);
  };

  const handleDeleteChip = (chip: any) => {
    setTags((prevTags: any) => prevTags.filter((tag: any) => tag !== chip));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(searchPosts({ query: search, tags: tags.join(",") }));
      navigate(`/posts/search?q=${search || ""}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

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
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.search}>
              <TextField
                name="search"
                variant="outlined"
                label="Search"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <ChipInput
                className={classes.chipInput}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                variant="contained"
                color="primary"
                fullWidth
                disabled={!search && !tags.length}
              >
                Search
              </Button>
            </Paper>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.paginate}>
              <Paginate page={page || 1} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
