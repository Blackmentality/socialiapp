import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  AddPost,
  OnboardingInterest,
  ProfilePage,
  Register,
  Home,
  ViewPost,
} from "../pages";
import ProtectRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const { loggedIn, user } = useSelector((store: any) => store.auth);
  return (
    <Routes>
      <Route element={<Login />} index></Route>
      <Route
        element={
          loggedIn && user.interests.length >= 3 ? (
            <Home />
          ) : loggedIn && user.interests.length >= 3 ? (
            <OnboardingInterest />
          ) : (
            <Login />
          )
        }
        path="login"
      ></Route>
      <Route
        element={
          loggedIn && user.interests.length >= 3 ? (
            <Home />
          ) : loggedIn && user.interests.length >= 3 ? (
            <OnboardingInterest />
          ) : (
            <Register />
          )
        }
        path="register"
      ></Route>
      <Route element={<OnboardingInterest />} path="onboarding"></Route>
      <Route element={<ForgotPassword />} path="forgot-password"></Route>
      <Route element={<ProtectRoutes />}>
        <Route element={<ProfilePage />} path="profile"></Route>
        <Route element={<ProfilePage />} path="profile/:id"></Route>
        <Route element={<Home />} path="home"></Route>
        <Route element={<ViewPost />} path="view-post/:id"></Route>
        <Route element={<AddPost />} path="add-post"></Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
