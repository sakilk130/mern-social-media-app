import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import makeStyles from "./styles/styles";

const NavBar = () => {
  const classes = makeStyles();
  const user: any = null;

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
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button variant="contained" color="secondary">
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
