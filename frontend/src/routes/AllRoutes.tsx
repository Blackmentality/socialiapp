import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  AddPost,
  OnboardingInterest,
  ProfilePage,
  Register,
} from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} index></Route>
      <Route element={<Login />} path="login"></Route>
      <Route element={<Register />} path="register"></Route>
      <Route element={<ProfilePage />} path="profile"></Route>
      <Route element={<AddPost />} path="add-post"></Route>
      <Route element={<ForgotPassword />} path="forgot-password"></Route>
      <Route element={<OnboardingInterest />} path="onboarding"></Route>
    </Routes>
  );
};

export default AllRoutes;
