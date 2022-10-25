import { lifestyle } from "../constant/assets";
import { Badge, ButtonGroup, Button } from "react-bootstrap";
import "./components.scss";
import {
  BsHeartFill,
  BsFillChatQuoteFill,
  BsShare,
  BsBookmark,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const HomeCard = ({ postData }: any) => {
  const navigate = useNavigate();
  const handleViewPost = () => {
    navigate("/view-post/4975");
  };
  return (
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
            <h5 onClick={handleViewPost} className="m-0">
              {postData.caption}
            </h5>
          )}
          {postData.img !== "" && (
            <img onClick={handleViewPost} src={postData.img} alt="" />
          )}
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
    </div>
  );
};

export default HomeCard;