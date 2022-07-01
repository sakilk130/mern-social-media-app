import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dispatch } from "redux";
import NavBar from "./components/NavBar";
import { AuthActions } from "./enums/AuthActions";
import Auth from "./pages/auth";
import Home from "./pages/home";
import PostDetails from "./pages/post-details/PostDetails";

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
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
