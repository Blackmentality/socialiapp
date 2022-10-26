import { useState } from "react";
import { Container, Button, ButtonGroup, Badge, FloatingLabel, Form } from "react-bootstrap";
import { Header } from "../components";
import { lifestyle, post1 } from "../constant/assets";
import {
  BsHeartFill,
  BsFillChatQuoteFill,
  BsShare,
  BsBookmark,
} from "react-icons/bs";
import './pages.scss'
const ViewPost = () => {
  const [postData, setpostData] = useState({
    img: post1,
    caption:
      'Many of life’s failures are people who did not realize how close they were to success when they gave up."– Thomas A. Edison',
    user: {
      name: "barbara ampofo",
      username: "barbara",
    },
  });
  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container>
        <div className="viewp-main">
          <div className="post-card">
            <div className="post-card-top d-flex justify-content-start align-items-center">
              <img src={lifestyle} alt="" />
              <div>
                <h6 className="m-0 text-capitalize">{postData.user.name}</h6>
                <Badge>Food</Badge>
                <span>|</span>
                <span>@{postData.user.username}</span>
                <span>|</span>
                <span>1hr ago</span>
              </div>
            </div>
            <div className="post-card-mid">
              <div>
                {postData.caption !== "" && (
                  <h5 className="m-0">{postData.caption}</h5>
                )}
                {postData.img !== "" && <img src={postData.img} alt="" />}
              </div>
            </div>
            <div className="post-card-bot d-flex justify-content-between align-items-center">
              <div>
                <ButtonGroup aria-label="Basic example">
                  <Button>
                    <BsHeartFill />
                  </Button>
                  <Button>
                    <BsFillChatQuoteFill />
                  </Button>
                  <Button>
                    <BsShare />
                  </Button>
                  <Button>
                    <BsBookmark />
                  </Button>
                </ButtonGroup>
              </div>
              <div className="w-50 d-flex justify-content-end align-items-center">
                <span>23 Likes</span>
                <span>|</span>
                <span>100 Comments</span>
              </div>
            </div>
            <div className="post-comment mt-2">
              <h5 className="mb-2">Comments</h5>
              <div className="pc-card d-flex justify-content-start">
                <img src={lifestyle} alt="" />
                <div>
                  <h6 className="mb-0">@Babbie</h6>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
              </div>
            </div>
            <div className="comment-box mt-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Write your comment..."
                className="mb-3"
              >
                <Form.Control as="textarea" style={{ height: '100px' }} type="text" placeholder="Enter your bio.." />
              </FloatingLabel>
              <div className="d-flex justify-content-end">
                <Button className="btn-comment">
                  Comment
                </Button>

              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ViewPost;
