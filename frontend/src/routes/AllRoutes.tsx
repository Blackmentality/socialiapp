import { Routes, Route } from "react-router-dom";
import { ForgotPassword, Login, OnboardingInterest, Register } from "../pages";
const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} index></Route>
      <Route element={<Login />} path="login"></Route>
      <Route element={<Register />} path="register"></Route>
      <Route element={<ForgotPassword />} path="forgot-password"></Route>
      <Route element={<OnboardingInterest />} path="onboarding"></Route>
    </Routes>
  );
};

export default AllRoutes;
