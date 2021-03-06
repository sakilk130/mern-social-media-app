import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    padding: "20px",
  },
  tag: {
    marginRight: "5px",
    marginTop: "10px",
    marginBottom: "15px",
  },
  image: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    height: "400px",
    overflowY: "scroll",
    cursor: "pointer",
  },
}));
