import { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Button,
  Modal,
  FloatingLabel,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Header, MasonryLayout } from "../components";
import { useToasts } from "react-toast-notifications";
import { banner, profile } from "../constant/assets";
import interests from "../constant/interest";
import { useSelector, useDispatch } from "react-redux";
import "./pages.scss";
import axios from "axios";
import { updateUser, assignUser } from "../redux/features/authSlice";
axios.defaults.withCredentials = true;

const ProfilePage = () => {
  const initialValue = {
    fullname: "",
    bio: "",
  };
  const { addToast } = useToasts();
  const [editData, setEditData] = useState(initialValue);
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };

  const handleChangeEditData = (e: any) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState("posts");
  const handleChangeActiveNav = (eventKey: any) => {
    setActive(eventKey);
  };

  const chooseImg = (type: any) => {
    const inputElem = document.createElement("input");
    inputElem.type = "file";
    inputElem.name = "image";
    inputElem.setAttribute("accept", ".jpg, .png, jpeg");
    inputElem.click();
    inputElem.onchange = (ev: any) => {
      showToast(`image updated successfully!`, "success");
      handleImageUpload(ev.target.files[0], type);
    };
  };

  const handleEditSubmit = async (e: any) => {
    // dispatch(showLoader);
    const data = { ...editData };
    try {
      const editProfle = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/edit-profile/${user._id}`,
        data
      );
      dispatch(assignUser(editProfle.data.data));
      // dispatch(hideLoader);
      setTimeout(() => {
        showToast("Profile updated successfully!", "success");
      }, 1000);
    } catch (error: any) {
      setTimeout(() => {
        showToast(`An error occured!\n ${error.message}\n Try again!`, "error");
      }, 2000);
      // dispatch(hideLoader);
    }
  };

  const handleImageUpload = (file: any, type: string) => {
    let formData = new FormData();
    formData.append("image", file);
    // dispatch(showLoader);
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user/change-img/${user._id}/${type}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setTimeout(() => {
            showToast(`${type} image updated successfully!`, "success");
          }, 1000);
          dispatch(updateUser(res.data.data));
          // dispatch(hideLoader);
        });
    } catch (error: any) {
      setTimeout(() => {
        showToast(`An error occured!\n ${error.message}\n Try again!`, "error");
      }, 2000);
      // dispatch(hideLoader);
    }
  };

  useEffect(() => {
    setEditData({ fullname: user.fullname, bio: user.bio });
  }, []);
  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container className="mt-3">
        <div
          className="profile-top"
          style={{
            backgroundImage: `url(${
              user.banner !== "" ? user.banner : banner
            })`,
          }}
        >
          <div className="prt-over d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-end w-100">
              <img
                alt=""
                src={user.profile_img !== "" ? user.profile_img : profile}
              />
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h6 className="text-capitalize m-0">{user.fullname}</h6>
                  <span>@{user.username}</span>
                  <span>{user.email}</span>
                  <p>{user.bio}</p>
                </div>
                <div className="d-flex justify-content-end align-items-center prt-btn">
                  <div className="">
                    <span>Posts</span>
                    <h6>{user.post_counts}</h6>
                  </div>
                  <Button className="edit-btn" onClick={handleShow}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-bot">
          <Nav
            defaultActiveKey="posts"
            variant="pills"
            className="justify-content-center mb-3"
            onSelect={handleChangeActiveNav}
          >
            <Nav.Item>
              <Nav.Link eventKey="posts">Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookmark">Bookmark</Nav.Link>
            </Nav.Item>
          </Nav>
          {active === "posts" && (
            <div>
              <MasonryLayout />
            </div>
          )}
          {active === "bookmark" && (
            <div>
              <MasonryLayout />
            </div>
          )}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="profm-main">
              <div className="profm-card">
                <div className="profm-tm d-flex justify-content-between align-items-center">
                  <h6>Profile Image</h6>
                  <span onClick={() => chooseImg("profile_img")}>
                    Change image
                  </span>
                </div>
                <div className="text-center">
                  <img
                    src={user.profile_img !== "" ? user.profile_img : profile}
                    alt=""
                    className="profm-cimg"
                  />
                </div>
              </div>
              <div className="profm-card">
                <div className="profm-tm d-flex justify-content-between align-items-center">
                  <h6>Banner</h6>
                  <span onClick={() => chooseImg("banner")}>Change banner</span>
                </div>
                <div>
                  <img
                    src={user.banner !== "" ? user.banner : banner}
                    alt=""
                    className="profm-cbanner"
                  />
                </div>
              </div>
              <div className="profm-card">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Full Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Barbara Ampofo"
                    name="fullname"
                    value={editData.fullname}
                    onChange={(e: any) => handleChangeEditData(e)}
                  />
                </FloatingLabel>
              </div>
              <div className="profm-card">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Bio"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    type="text"
                    name="bio"
                    value={editData.bio}
                    onChange={(e: any) => handleChangeEditData(e)}
                    placeholder="Enter your bio.."
                  />
                </FloatingLabel>
              </div>
              <div className="profm-card">
                <div className="profm-tm d-flex justify-content-between align-items-center">
                  <h6>Interests</h6>
                </div>
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              className="btn-sprof"
              onClick={handleEditSubmit}
              variant="primary"
            >
              Save Profile
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfilePage;
