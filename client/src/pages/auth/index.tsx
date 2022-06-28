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
import { signin, signup } from "../../actions/auth";
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

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const googleSignInHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((res: any) => {
        console.log(res);
        dispatch({
          type: AuthActions.LOGIN,
          payload: {
            user: {
              name: res?.user?.displayName,
              email: res?.user?.email,
              imageUrl: res?.user?.photoURL,
              googleId: res?.additionalUserInfo?.profile?.id,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      if (
        formData.first_name &&
        formData.last_name &&
        formData.email &&
        formData.password &&
        formData.confirmPassword
      ) {
        if (formData.password === formData.confirmPassword) {
          dispatch(
            signup({
              first_name: formData.first_name,
              last_name: formData.last_name,
              email: formData.email,
              password: formData.password,
            })
          );
        } else {
          alert("Passwords do not match");
        }
      }
    } else {
      if (formData.email && formData.password) {
        dispatch(
          signin({
            email: formData.email,
            password: formData.password,
          })
        );
      } else {
        alert("Please fill all the fields");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.card}>
        <div className={classes.authHeader}>
          <LockOpenIcon className={classes.authHeaderLogo} />
          <Typography variant="h5">Sign {isSignUp ? "Up" : "In"}</Typography>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
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
                  name="first_name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </Grid>
              <Grid xs={12} lg={6}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
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
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {isSignUp && (
            <TextField
              id="outlined-basic"
              label="Confoirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
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
