import { useState, useEffect } from "react";
import { Container, Button, Badge, FloatingLabel, Form } from "react-bootstrap";
import { CommentCard, Header, PostActions } from "../components";
import { profile } from "../constant/assets";
import "./pages.scss";
import axios from "axios";
import TimeAgo from "react-timeago";
import { uniqBy } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const ViewPost = () => {
  const { id } = useParams();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    currentComPage: 1,
    total: 0,
  });
  const [likes, setLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments]: any = useState([]);
  const [postData, setPostData]: any = useState({ tags: [] });
  const [postAuthor, setPostAuthor]: any = useState(null);

  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };

  const viewProfile = () => {
    navigate(`/profile/${postAuthor._id}`);
  };

  const getPost = async () => {
    axios.defaults.withCredentials = true;
    try {
      const post = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`
      );
      setPostData(post.data.data);
      setCommentCount(post.data.data.commentsCount);
      setLikes(post.data.data.likesCount);
      const author = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${post.data.data.owner}`
      );
      setPostAuthor(author.data.data);
    } catch (error) {
      showToast("Post not found!", "warning");
      navigate("/home");
    }
  };
  const getComments = async () => {
    axios.defaults.withCredentials = true;
    const data = {
      params: {
        page: pageData.currentComPage,
      },
    };
    try {
      const allCom = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comment/${id}`,
        data
      );
      console.log(allCom.data.data);

      setAllComments((prev: any) => [...prev, ...allCom.data.data]);
      setPageData((prev) => ({ ...prev, total: allCom.data.total }));
    } catch (error) {
      showToast("An error occured", "error");
    }
  };

  const handleCommentText = (e: any) => {
    setCommentText(e.target.value);
  };

  const addQuoteComment = async () => {
    if (commentText.length >= 3) {
      const data = {
        comment: commentText,
      };
      try {
        const comment = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/comment/${id}`,
          data
        );
        setAllComments([comment.data.data, ...allComments]);
        setCommentText("");
        showToast("Comment submitted successfully", "success");
        setCommentCount(commentCount + 1);
      } catch (error) {
        showToast("An error occured", "error");
      }
    } else {
      showToast("Please add comment first!", "error");
    }
  };

  useEffect(() => {
    getComments();
  }, [pageData.currentComPage]);

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container>
        <div className="viewp-main">
          <div className="post-card">
            <div className="post-card-top d-flex justify-content-start align-items-center">
              {postAuthor !== null && (
                <img
                  onClick={viewProfile}
                  src={
                    postAuthor.profile_img !== ""
                      ? postAuthor.profile_img
                      : profile
                  }
                  alt="profile-img"
                />
              )}
              <div>
                <h6 className="m-0 text-capitalize" onClick={viewProfile}>
                  {postAuthor !== null ? postAuthor.fullname : ""}
                </h6>
                <Badge>{postData.category}</Badge>
                <span>|</span>
                <span>@{postAuthor !== null ? postAuthor.username : ""}</span>
                <span>|</span>
                <span>
                  {postData !== null ? (
                    <TimeAgo date={postData.createdAt} />
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
            <div className="post-card-mid">
              <div>
                {postData.caption !== "" && (
                  <h5 className="m-0">{postData.caption}</h5>
                )}
                {postData.image !== "" && <img src={postData.image} alt="" />}
              </div>
            </div>
            <div className="post-card-bot d-flex justify-content-between align-items-center">
              {postData.likes !== undefined && (
                <PostActions
                  id={postData._id}
                  postData={postData}
                  likesFunc={setLikes}
                  allLikes={likes}
                />
              )}
              <div className="w-50 d-flex justify-content-end align-items-center">
                <span>{postData.likesCount} Likes</span>
                <span>|</span>
                <span>{commentCount} Comments</span>
              </div>
            </div>
            <hr />
            <div className="post-comment mt-2">
              <h5 className="mb-2">Comments</h5>
              {uniqBy(allComments, "_id").map((comment: any) => (
                <CommentCard commentData={comment} key={comment._id} />
              ))}
            </div>
            <div className="comment-box mt-2">
              <FloatingLabel
                controlId="comment-box"
                label="Write your comment..."
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  value={commentText}
                  onChange={handleCommentText}
                  style={{ height: "100px" }}
                  type="text"
                  placeholder="Enter your bio.."
                />
              </FloatingLabel>
              <div className="d-flex justify-content-end">
                <Button
                  className="btn-comment"
                  id="comb-btn"
                  onClick={addQuoteComment}
                  disabled={commentText.length < 3}
                >
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
