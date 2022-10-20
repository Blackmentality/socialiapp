import { useState } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import { Header } from "../components";
import { bgImg, lifestyle } from "../constant/assets";
import "./pages.scss";

const ProfilePage = () => {
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
                  <Button>Edit Profile</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-bot">
          <Nav
            defaultActiveKey="posts"
            variant="pills"
            className="justify-content-center"
            onSelect={handleChangeActiveNav}
          >
            <Nav.Item>
              <Nav.Link eventKey="posts">Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookmark">Bookmark</Nav.Link>
            </Nav.Item>
          </Nav>
          {active === "posts" && <div>posts</div>}
          {active === "bookmark" && <div>bookmark</div>}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
