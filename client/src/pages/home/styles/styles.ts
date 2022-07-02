import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  search: {
    padding: "20px",
    marginBottom: "20px",
  },
  chipInput: {
    margin: "10px 0",
    width: "100%",
  },
  paginate: {
    display: "flex",
    justifyContent: "center",
  },
}));
