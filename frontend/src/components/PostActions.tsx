import {
  BsHeartFill,
  BsFillChatQuoteFill,
  BsShare,
  BsBookmark,
} from "react-icons/bs";
import "./components.scss";
import { Button, ButtonGroup, Popover, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ShareButtons from "./ShareButtons";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { assignUser } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

const PostActions = ({ id, postData, likesFunc, allLikes }: any) => {
  const dispatch = useDispatch();
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

  const goToComment = () => {
    if (id !== undefined) {
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

  const addRemoveSavedPost = (quoteId: string) => {
    let mainSaved: any = [...userData.saved];
    let userD = { ...userData };
    const isQuoteSaved = mainSaved.findIndex((id: string) => id === quoteId);
    if (isQuoteSaved !== -1) {
      mainSaved.splice(isQuoteSaved, 1);
    } else {
      mainSaved.push(quoteId);
    }
    userD.saved = mainSaved;
    dispatch(assignUser(userD));
  };
  const isPostLike = () => {
    const isLike = postData.likes.includes(userData._id);
    console.log(isLike);

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
        setTimeout(() => {
          setSaveDisable(false);
        }, 3000);
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
        <Button disabled={saveDisable} onClick={toggleSaved}>
          {isSaved ? (
            <BsBookmark style={{ color: "#000" }} />
          ) : (
            <BsBookmark style={{ color: "#999" }} />
          )}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PostActions;
