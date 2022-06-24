import { makeStyles } from "@material-ui/core/styles";

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
}));
