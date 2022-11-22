import { logo } from "../constant/assets";
import "./pages.scss";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { assignUser } from "../redux/features/authSlice";

axios.defaults.withCredentials = true;
const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

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
    if (loginData.email !== "" && loginData.password !== "") {
      try {
        const loginRes = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/signin`,
          loginData
        );
        localStorage.setItem(
          "sociali_user",
          JSON.stringify(loginRes.data.data)
        );
        dispatch(assignUser(loginRes.data.data));
        if (loginRes.data.data.interests.length < 3) {
          navigate("/onboarding");
        } else {
          navigate("/home");
          showToast(
            `Hi ${loginRes.data.data.fullname} \n Welcome to Sociali`,
            "success"
          );
        }
      } catch (error: any) {
        showToast(error.response.data.message, "error");
      }
    } else {
      showToast("Please fill all the input fields!", "warning");
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
                  required={true}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="main-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => changeValue(e)}
                  name="password"
                  required={true}
                  placeholder="Enter your password"
                />
              </Form.Group>
              <div className="d-grid gap-2 mlbtn">
                <Button
                  variant="primary"
                  className="mb-4 main-login-btn"
                  size="lg"
                  onClick={loginUser}
                  disabled={loginData.email === "" && loginData.password === ""}
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
