import {
  BsHeartFill,
  BsFillChatQuoteFill,
  BsShare,
  BsTrash,
  BsBookmark,
  BsFillBookmarkFill,
} from "react-icons/bs";
import "./components.scss";
import { AiFillEdit } from "react-icons/ai";
import { Button, ButtonGroup, Popover, OverlayTrigger } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ShareButtons from "./ShareButtons";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { assignUser } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

const PostActions = ({
  id,
  postData,
  likesFunc,
  allLikes,
  delKeyFunc,
}: any) => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const [likedPost, setLikedPost] = useState(false);
  const [saveDisable, setSaveDisable] = useState(false);
  const [likeDisable, setLikeDisable] = useState(false);
  const userData = useSelector((state: any) => state.auth.user);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
      autoDismissTimeout: 5000,
    });
  };

  useEffect(() => {
    if (postData.savedCounts !== undefined) {
      if (postData.savedCounts.includes(userData._id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
      isPostLike();
    }
  }, []);

  const deletePost = async () => {
    delKeyFunc(id);
  };

  const editPost = async () => {
    navigate(`/add-post/${id}`);
  };

  const goToComment = () => {
    if (urlParams.id !== undefined) {
      const comBox: any = document.getElementById("comment-box");
      const comBtn = document.getElementById("comb-btn");
      comBtn?.scrollIntoView();
      setTimeout(() => {
        comBox?.focus();
      }, 500);
    } else {
      navigate(`/view-post/${id}`);
    }
  };

  const addRemoveSavedPost = (postId: string) => {
    let mainSaved: any = [...userData.saved];
    let userD = { ...userData };
    const isPostSaved = mainSaved.findIndex((id: string) => id === postId);
    if (isPostSaved !== -1) {
      mainSaved.splice(isPostSaved, 1);
    } else {
      mainSaved.push(postId);
    }
    userD.saved = mainSaved;
    dispatch(assignUser(userD));
  };
  const isPostLike = () => {
    const isLike = postData.likes.includes(userData._id);
    setLikedPost(isLike);
  };

  const likeAndDislike = async () => {
    if (likedPost === false) {
      setLikeDisable(true);
      likesFunc(allLikes + 1);
      setTimeout(() => {
        setLikeDisable(false);
      }, 3000);
    } else {
      likesFunc(allLikes - 1);
    }
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/posts/like/${id}`);
    } catch (error) {
      showToast("An error occured", "error");
    }
    setLikedPost(!likedPost);
  };

  const toggleSaved = async () => {
    if (userData._id !== postData.owner) {
      if (isSaved === false) {
        setSaveDisable(true);
        showToast(`Post saved successfully`, "success");
        setTimeout(() => {
          setSaveDisable(false);
        }, 3000);
      } else {
        showToast(`Post unsaved successfully`, "success");
      }
      try {
        axios.put(`${process.env.REACT_APP_BASE_URL}/posts/save/${id}`);
      } catch (error) {
        showToast("An error occured", "error");
      }
      addRemoveSavedPost(id);
      setIsSaved(!isSaved);
    } else {
      showToast(`Sorry 😊, I can't save your own post!`, "warning");
    }
  };

  return (
    <div className="postAc">
      <ButtonGroup aria-label="Basic example">
        <Button
          onClick={likeAndDislike}
          disabled={likeDisable}
          className={`${likedPost === true ? "likedActive" : ""} `}
        >
          <BsHeartFill />
        </Button>
        <Button onClick={goToComment}>
          <BsFillChatQuoteFill />
        </Button>
        <OverlayTrigger
          placement="top"
          trigger="click"
          overlay={
            <Popover id={`popover-positioned-${id}`}>
              <Popover.Body className="share-pop">
                <ShareButtons post={postData} />
              </Popover.Body>
            </Popover>
          }
        >
          <Button className="no-border no-box-shadow no-hover">
            <BsShare />
          </Button>
        </OverlayTrigger>
        <Button
          disabled={saveDisable}
          onClick={toggleSaved}
          className={`${isSaved ? "postac-active" : ""}`}
        >
          {isSaved ? (
            <BsFillBookmarkFill style={{ color: "#000 " }} />
          ) : (
            <BsBookmark style={{ color: "#999" }} />
          )}
        </Button>
        {userData._id === postData.owner && (
          <>
            <Button onClick={deletePost}>
              <BsTrash />
            </Button>
            <Button onClick={editPost}>
              <AiFillEdit />
            </Button>
          </>
        )}
      </ButtonGroup>
    </div>
  );
};

export default PostActions;
