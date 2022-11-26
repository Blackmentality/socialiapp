import axios from "axios";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { profile } from "../constant/assets";
import TimeAgo from "react-timeago";

const CommentCard = ({ commentData }: any) => {
  const { addToast } = useToasts();
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };
  const [ownerData, setOwnerData]: any = useState({});
  const getOwner = async () => {
    axios.defaults.withCredentials = true;
    try {
      const author = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${commentData.owner}`
      );
      setOwnerData(author.data.data);
    } catch (error) {
      showToast("An error occured", "error");
    }
  };
  useEffect(() => {
    getOwner();
  }, []);
  return (
    <div className="pc-card d-flex justify-content-start">
      <img
        src={ownerData.profile_img !== "" ? ownerData.profile_img : profile}
        alt="profile-img"
      />
      <div className="w-100">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">@{ownerData.username}</h6>
          <small>
            <TimeAgo date={commentData.createdAt} />
          </small>
        </div>
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
