import { logo } from "../constant/assets";
import "./pages.scss";
import { Row, Col, Button } from "react-bootstrap";
import interests from "../constant/interest";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { assignUser } from "../redux/features/authSlice";
axios.defaults.withCredentials = true;

const OnboardingInterest = () => {
  const navigate = useNavigate();
  const [user, setUser]: any = useState({});
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };

  const [selectedInts, setSelectedInts]: any = useState([]);

  const handleSelect = (interest: any) => {
    const allInts = [...selectedInts];
    const findIndexInt = allInts.findIndex((a: any) => a === interest.name);
    console.log(findIndexInt);

    if (findIndexInt === -1) {
      allInts.push(interest.name);
      setSelectedInts(allInts);
    } else {
      setSelectedInts(allInts.filter((a) => a !== interest.name));
    }
  };

  const saveInterests = async () => {
    const data = { interests: selectedInts };
    if (selectedInts.length >= 3) {
      try {
        const editProfile = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/edit-profile/${user._id}`,
          data
        );
        dispatch(assignUser(editProfile.data.data));
        localStorage.setItem(
          "sociali_user",
          JSON.stringify(editProfile.data.data)
        );
        showToast("Profile updated successfully!", "success");
        setTimeout(() => {
          navigate("/home");
          showToast(
            `Hi ${editProfile.data.data.fullname} \n Welcome to Sociali`,
            "success"
          );
        }, 1000);
      } catch (error: any) {
        setTimeout(() => {
          showToast(
            `An error occured!\n ${error.message}\n Try again!`,
            "error"
          );
        }, 2000);
      }
    } else {
      showToast("Interest must be at least 3", "warning");
    }
  };

  useEffect(() => {
    const isUser: any = localStorage.getItem("sociali_user");
    setUser(JSON.parse(isUser));
  }, []);

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
                <Col
                  lg={4}
                  key={index}
                  className="gap-2 mb-4 text-center"
                  onClick={() => handleSelect(interest)}
                >
                  <div
                    className="interest-card"
                    style={{
                      border: selectedInts.includes(interest.name)
                        ? "2px solid #000"
                        : "none",
                    }}
                  >
                    <img src={interest.img} height={50} alt="" />
                    <h6>{interest.name}</h6>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="d-grid gap-2 mlbtn">
            <Button
              variant="primary"
              className="mb-4 main-login-btn"
              size="lg"
              onClick={saveInterests}
              // disabled={selectedInts.length < 3}
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingInterest;
