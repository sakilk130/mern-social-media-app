import { makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    borderRadius: "15px",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px 0px",
  },

  header: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "10px",
    width: "50px",
    height: "50px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "250px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  [theme.breakpoints.down("sm")]: {
    header: {
      fontSize: "35px",
    },
  },
}));
