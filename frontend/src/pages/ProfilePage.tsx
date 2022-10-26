import { useState } from "react";
import { Container, Nav, Button, Modal, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import { Header, MasonryLayout } from "../components";
import { bgImg, lifestyle } from "../constant/assets";
import interests from "../constant/interest";
import "./pages.scss";

const ProfilePage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState("posts");
  const handleChangeActiveNav = (eventKey: any) => {
    setActive(eventKey);
  };
  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container className="mt-3">
        <div
          className="profile-top"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="prt-over d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-end">
              <img src={lifestyle} alt="" />
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-capitalize m-0">barbara ampofo</h6>
                  <span>@barbaraampofo</span>
                  <span>barbaraampofo@gmail.com</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur, exercitationem et. Laboriosam eum maxime quidem
                    omnis hic deleniti, vero dolore.
                  </p>
                </div>
                <div className="d-flex justify-content-end align-items-center prt-btn">
                  <div className="">
                    <span>Posts</span>
                    <h6>484</h6>
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
                  <span>Change image</span>
                </div>
                <div className="text-center">
                  <img src={lifestyle} alt="" className="profm-cimg" />
                </div>
              </div>
              <div className="profm-card">
                <div className="profm-tm d-flex justify-content-between align-items-center">
                  <h6>Banner</h6>
                  <span>Change banner</span>
                </div>
                <div>
                  <img src={bgImg} alt="" className="profm-cbanner" />
                </div>
              </div>
              <div className="profm-card">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Full Name"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Barbara Ampofo" />
                </FloatingLabel>
              </div>
              <div className="profm-card">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Bio"
                  className="mb-3"
                >
                  <Form.Control as="textarea" style={{ height: '100px' }} type="text" placeholder="Enter your bio.." />
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
            <Button className="btn-sprof" variant="primary">Save Profile</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfilePage;
