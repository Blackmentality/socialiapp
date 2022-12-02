import { profile } from "../constant/assets";
import { Badge } from "react-bootstrap";
import "./components.scss";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostActions from "./PostActions";

const HomeCard = ({ postData, func }: any) => {
  const [postAuthor, setPostAuthor]: any = useState(null);
  const [likes, setLikes] = useState(postData.likesCount);
  const navigate = useNavigate();
  const handleViewPost = () => {
    navigate(`/view-post/${postData._id}`);
  };

  const getUser = async () => {
    const author = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/${postData.owner}`
    );
    setPostAuthor(author.data.data);
  };

  const viewProfile = () => {
    navigate(`/profile/${postAuthor._id}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="post-card">
      <div className="post-card-top d-flex justify-content-start align-items-center">
        {postAuthor !== null && (
          <img
            onClick={viewProfile}
            src={
              postAuthor.profile_img !== "" ? postAuthor.profile_img : profile
            }
            alt="profile-img"
          />
        )}
        <div>
          <h6 onClick={viewProfile} className="m-0 text-capitalize">
            {postAuthor !== null ? postAuthor.fullname : ""}
          </h6>
          <Badge>{postData.category}</Badge>
          <span>|</span>
          <span>@{postAuthor !== null ? postAuthor.username : ""}</span>
          <span>|</span>
          <span>
            {postData !== null ? <TimeAgo date={postData.createdAt} /> : ""}
          </span>
        </div>
      </div>
      <div className="post-card-mid">
        <div>
          {postData.caption !== "" && (
            <h5 onClick={handleViewPost} className="m-0">
              {postData.caption}
            </h5>
          )}
          {postData.image !== "" && (
            <img onClick={handleViewPost} src={postData.image} alt="" />
          )}
        </div>
      </div>
      <div className="post-card-bot d-flex justify-content-between align-items-center">
        <PostActions
          id={postData._id}
          postData={postData}
          likesFunc={setLikes}
          allLikes={likes}
          delKeyFunc={func}
        />
        <div className="w-50 d-flex justify-content-end align-items-center">
          <span>{likes} Likes</span>
          <span>|</span>
          <span>{postData.commentsCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
