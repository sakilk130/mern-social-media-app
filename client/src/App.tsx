import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dispatch } from "redux";
import NavBar from "./components/NavBar";
import { AuthActions } from "./enums/AuthActions";
import Auth from "./pages/auth";
import Home from "./pages/home";

const App = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const user: any = JSON.parse(localStorage.getItem("profile") || "null");

  useEffect(() => {
    if (user?.token) {
      dispatch({
        type: AuthActions.LOGIN,
        payload: user,
      });
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
