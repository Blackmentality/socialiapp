import { logo } from "../constant/assets";
import "./pages.scss";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
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
                    <Form.Control type="text" placeholder="Barbara" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Ampofo" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="main-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="main-group" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <div className="d-grid gap-2 mlbtn">
                <Button
                  variant="primary"
                  className="mb-4 main-login-btn"
                  size="lg"
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
