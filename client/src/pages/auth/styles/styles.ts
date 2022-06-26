import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },

  authHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },

  authHeaderLogo: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50%",
    padding: "10px",
    color: "white",
  },

  form: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  dontHaveAccount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));
