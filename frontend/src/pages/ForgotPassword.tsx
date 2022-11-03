import { logo } from "../constant/assets";
import "./pages.scss";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

axios.defaults.withCredentials = true;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotUser = async () => {
    const data = {
      email: email,
    };
    try {
      const forgotRes = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/forgot-password`,
        data
      );
      console.log(forgotRes.data.data);
    } catch (error) {
      console.log(error);
    }
    console.log(email);
  };
  return (
    <div className="container p-0">
      <div className="main-login">
        <div className="login-top d-flex justify-content-start align-items-center">
          <img src={logo} alt="" width={50} height={50} />
          <h6 className="m-0">Sociali</h6>
        </div>
        <div className="login-bot">
          <h5 className="m-0">Reset Your Password</h5>
          <h6 className="reset-pass">
            You will receive instructions for resetting your password
          </h6>
          <div className="mt-3">
            <Form>
              <Form.Group className="main-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <div className="d-grid gap-2 mlbtn">
                <Button
                  variant="primary"
                  className="mb-4 main-login-btn"
                  size="lg"
                  onClick={forgotUser}
                >
                  Reset Password
                </Button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Link to={"/login"} className="mlb-plain">
                  Sign in to account
                </Link>
                <Link to={"/register"} className="mlb-plain">
                  Do you have an account?
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
