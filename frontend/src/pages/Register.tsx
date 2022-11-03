import { logo } from "../constant/assets";
import "./pages.scss";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const Register = () => {
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
    fname: "",
    lname: "",
  };
  const [registerData, setRegisterData] = useState(initialValue);

  const changeValue = (e: any) => {
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async () => {
    console.log("click");

    const data = {
      fullname: `${registerData.fname} ${registerData.lname}`,
      email: `${registerData.email}`,
      password: `${registerData.password}`,
    };
    try {
      const registerRes = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        data
      );
      console.log(registerRes.data.data);
      showToast("Registered successfully!", "success");
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
          <h5 className="m-0">Get started for free</h5>
          <div className="mt-3">
            <Form>
              <Row className="login-row">
                <Col>
                  <Form.Group controlId="fname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      name="fname"
                      type="text"
                      placeholder="Barbara"
                      onChange={(e) => changeValue(e)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      name="lname"
                      type="text"
                      placeholder="Ampofo"
                      onChange={(e) => changeValue(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="main-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => changeValue(e)}
                />
              </Form.Group>
              <Form.Group className="main-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => changeValue(e)}
                />
              </Form.Group>
              <div className="d-grid gap-2 mlbtn">
                <Button
                  variant="primary"
                  className="mb-4 main-login-btn"
                  size="lg"
                  onClick={registerUser}
                >
                  Get started
                </Button>
              </div>
              <div className="text-center">
                <Link to={"/login"} className="mlb-plain">
                  Sign in to account
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
