import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { auth, provider } from "../../config/firebase";
import { AuthActions } from "../../enums/AuthActions";
import { AppState } from "../../reducers";
import makeStyles from "./styles/styles";

const Auth = () => {
  const classes = makeStyles();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const user = useSelector((state: AppState) => state.auth);
  const [isSignUp, setIsSignUp] = useState(false);

  const googleSignInHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((res: any) => {
        dispatch({
          type: AuthActions.LOGIN,
          payload: {
            user: {
              name: res?.user?.displayName,
              email: res?.user?.email,
              imageUrl: res?.user?.photoURL,
            },
            token: res?.credential?.idToken,
          },
        });
        navigate("/");
      })
      .catch((err: any) => alert(err));
  };

  useEffect(() => {
    if (user?.authData?.token) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.card}>
        <div className={classes.authHeader}>
          <LockOpenIcon className={classes.authHeaderLogo} />
          <Typography variant="h5">Sign {isSignUp ? "Up" : "In"}</Typography>
        </div>
        <form className={classes.form}>
          {isSignUp && (
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid xs={12} lg={6}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} lg={6}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          )}
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
          />
          {isSignUp && (
            <TextField
              id="outlined-basic"
              label="Confoirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
            />
          )}

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>

          <Button
            className={classes.button}
            color="primary"
            fullWidth
            variant="contained"
            onClick={googleSignInHandler}
          >
            Google Sign In
          </Button>

          <div className={classes.dontHaveAccount}>
            <Typography variant="button">
              {isSignUp ? "Already have an Account" : "Don't have an Account?"}
            </Typography>{" "}
            &nbsp;
            <Button
              size="small"
              color="secondary"
              onClick={() => setIsSignUp((prev: boolean) => !prev)}
            >
              Sign {isSignUp ? "In" : "Up"}
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default Auth;
