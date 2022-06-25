import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
}));
