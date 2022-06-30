import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { AppState } from "../../reducers";
import makeStyles from "./styles/styles";

const NavBar = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth);

  const logoutHandler = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    const token = user?.authData?.user?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logoutHandler();
    }
  }, [user]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.logo}>
        <Typography className={classes.header} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src="/images/memories.png"
          alt="memories"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.authData ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.authData?.user?.name}
              src={user?.authData?.user?.imageUrl}
            >
              {user?.authData?.user?.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.authData?.user?.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
