import { logo } from "../constant/assets";
import "./pages.scss";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

axios.defaults.withCredentials = true;
const Login = () => {
  const { addToast } = useToasts();

  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };

  const initialValue = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialValue);

  const changeValue = (e: any) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginUser = async () => {
    try {
      const loginRes = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signin`,
        loginData
      );
      console.log(loginRes.data.data);
      showToast("Logged in successfully!", "success");
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  return (
    <div className="container p-0">
      <div className="main-login">
        <div className="login-top d-flex justify-content-start align-items-center">
          <img src={logo} alt="" width={50} height={50} />
          <h6 className="m-0">Sociali</h6>
        </div>
        <div className="login-bot">
          <h5 className="m-0">Welcome Back</h5>
          <div className="mt-3">
            <Form>
              <Form.Group className="main-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => changeValue(e)}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="main-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => changeValue(e)}
                  name="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <div className="d-grid gap-2 mlbtn">
                <Button
                  variant="primary"
                  className="mb-4 main-login-btn"
                  size="lg"
                  onClick={loginUser}
                >
                  Login
                </Button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Link to={"/register"} className="mlb-plain">
                  Do you have an account?
                </Link>
                <Link to={"/forgot-password"} className="mlb-plain">
                  Forgot Password
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
