import { logo } from "../constant/assets";
import "./pages.scss";
import { Row, Col, Button } from "react-bootstrap";
import interests from "../constant/interest";
const OnboardingInterest = () => {
  return (
    <div className="container p-0">
      <div className="main-login">
        <div className="login-top d-flex justify-content-start align-items-center">
          <img src={logo} alt="" width={50} height={50} />
          <h6 className="m-0">Sociali</h6>
        </div>
        <div className="login-bot">
          <h5 className="m-0">Select at least three(3) interests</h5>
          <div className="mt-5">
            <Row>
              {interests.map((interest, index) => (
                <Col lg={4} key={index} className="gap-2 mb-4 text-center">
                  <div className="interest-card">
                    <img src={interest.img} height={50} alt="" />
                    <h6>{interest.name}</h6>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="d-grid gap-2 mlbtn">
            <Button variant="primary" className="mb-4 main-login-btn" size="lg">
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingInterest;
