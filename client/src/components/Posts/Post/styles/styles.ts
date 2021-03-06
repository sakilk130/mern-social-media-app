import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "400px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
    cursor: "pointer",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlayIcon: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  message: {
    overflowY: "scroll",
  },
  details: {
    margin: "10px",
    "& div": {
      marginRight: "5px",
    },
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
}));
