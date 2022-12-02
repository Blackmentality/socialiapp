import axios from "axios";
import { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";
import { Header } from "../components";
import interests from "../constant/interest";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import "./pages.scss";
import { useNavigate, useParams } from "react-router-dom";
import { assignUser } from "../redux/features/authSlice";
axios.defaults.withCredentials = true;

const AddPost = () => {
  const userData = useSelector((state: any) => state.auth.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };
  const [postData, setPostData] = useState({
    caption: "",
    category: "",
  });
  const getPost = async () => {
    axios.defaults.withCredentials = true;
    try {
      const post = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`
      );
      setPostData({
        caption: post.data.data.caption,
        category: post.data.data.category,
      });
      if (post.data.data.image !== "") {
        setImage(post.data.data.image);
      }
    } catch (error) {
      showToast("Post not found!", "warning");
      navigate("/home");
    }
  };
  const [image, setImage]: any = useState(null);
  const [fileData, setFileData]: any = useState(null);

  const handleChangePostData = (e: any) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const chooseImg = (ev: any) => {
    const img = ev.target.files[0];
    const reader: any = new FileReader();
    reader.onloadend = () => {
      setFileData(img);
      setImage(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const handlePost = async () => {
    let formData = new FormData();
    formData.append("image", fileData);
    formData.append("promoData", JSON.stringify(postData));

    try {
      const createPost = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      showToast(`Post created successfully!`, "success");
      const uData: any = { ...userData };
      uData["post_counts"] = userData.post_counts + 1;
      dispatch(assignUser(uData));
      navigate("/home");
    } catch (error: any) {
      setTimeout(() => {
        showToast(`An error occured!\n ${error.message}\n Try again!`, "error");
      }, 2000);
      // dispatch(hideLoader);
    }
  };

  const handleEditPost = async () => {
    let formData = new FormData();
    formData.append("image", fileData);
    formData.append("promoData", JSON.stringify(postData));
    try {
      const createPost = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      showToast(`Post editted successfully!`, "success");
      navigate("/home");
    } catch (error: any) {
      setTimeout(() => {
        showToast(`An error occured!\n ${error.message}\n Try again!`, "error");
      }, 2000);
      // dispatch(hideLoader);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      getPost();
    }
  }, [id]);

  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container className="mt-3">
        <div className="add-main">
          <div className="add-card">
            <h5 className="m-0 mb-3">Add a post</h5>
            <FloatingLabel
              className="mb-3"
              controlId="floatingTextarea2"
              label="What's on your mind?"
            >
              <Form.Control
                as="textarea"
                name="caption"
                value={postData.caption}
                onChange={(e: any) => handleChangePostData(e)}
                placeholder="What's on your mind?"
                style={{ height: "150px" }}
              />
            </FloatingLabel>
            <div className="adp mb-3">
              {image !== null && (
                <img src={image} alt="" width={150} height={150} />
              )}
            </div>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              value={postData.category}
              name="category"
              onChange={(e: any) => handleChangePostData(e)}
            >
              <option>Select an interest</option>
              {interests.map((interest, index) => (
                <option value={interest.name} key={index}>
                  {interest.name}
                </option>
              ))}
            </Form.Select>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" onChange={(e: any) => chooseImg(e)} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={id !== undefined ? handleEditPost : handlePost}
              >
                {id !== undefined ? "Save Post" : "Create Post"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddPost;
