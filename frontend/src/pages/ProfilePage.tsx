import { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Button,
  Modal,
  FloatingLabel,
  Form,
  Row,
  Badge,
  Col,
} from "react-bootstrap";
import { Header, MasonryLayout } from "../components";
import { useToasts } from "react-toast-notifications";
import { banner, profile } from "../constant/assets";
import interests from "../constant/interest";
import { useSelector, useDispatch } from "react-redux";
import "./pages.scss";
import axios from "axios";
import { updateUser, assignUser } from "../redux/features/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { uniqBy } from "lodash";
import { showLoader, hideLoader } from "../redux/features/loaderSlice";
import { EmptyData, SkeletonLayout } from "../components/UIHelpers";
axios.defaults.withCredentials = true;

const ProfilePage = () => {
  const params = useParams();
  const [delKey, setDelKey] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [userPosts, setUserPosts]: any = useState([]);
  const [savedPost, setSavedPost]: any = useState([]);
  const [isMainUser, setIsMainUser] = useState(false);
  const [userData, setUserData]: any = useState({});
  const [userSavedPosts, setUserSavedPosts]: any = useState([]);
  const [userInterets, setUserInterets]: any = useState([]);
  const [savedCursor, setSavedCursor] = useState(0);
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    curentPostPage: 1,
    total: 0,
  });
  const initialValue = {
    fullname: "",
    bio: "",
  };
  const { addToast } = useToasts();
  const [editData, setEditData] = useState(initialValue);
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };

  const handleChangeEditData = (e: any) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectInterest = (interest: string) => {
    const uInterest = [...userInterets];
    const isSelected = userInterets.findIndex((a: string) => a === interest);

    if (isSelected !== -1) {
      setUserInterets(uInterest.filter((a) => a !== interest));
    } else {
      setUserInterets((prev: any) => [...prev, interest]);
    }
  };

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState("posts");
  const handleChangeActiveNav = (eventKey: any) => {
    setActive(eventKey);
  };

  const chooseImg = (type: any) => {
    const inputElem = document.createElement("input");
    inputElem.type = "file";
    inputElem.name = "image";
    inputElem.setAttribute("accept", ".jpg, .png, jpeg");
    inputElem.click();
    inputElem.onchange = (ev: any) => {
      showToast(`image updated successfully!`, "success");
      handleImageUpload(ev.target.files[0], type);
    };
  };

  const handleEditSubmit = async (e: any) => {
    dispatch(showLoader);
    const data = { ...editData, interests: userInterets };
    if (userInterets.length >= 3) {
      try {
        const editProfle = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/edit-profile/${user._id}`,
          data
        );
        dispatch(assignUser(editProfle.data.data));
        dispatch(hideLoader);
        setTimeout(() => {
          showToast("Profile updated successfully!", "success");
        }, 1000);
      } catch (error: any) {
        setTimeout(() => {
          showToast(
            `An error occured!\n ${error.message}\n Try again!`,
            "error"
          );
        }, 2000);
        dispatch(hideLoader);
      }
    } else {
      showToast("Interest must be at least 3", "warning");
    }
  };

  const handleImageUpload = (file: any, type: string) => {
    let formData = new FormData();
    formData.append("image", file);
    // dispatch(showLoader);
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user/change-img/${user._id}/${type}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setTimeout(() => {
            showToast(`${type} image updated successfully!`, "success");
          }, 1000);
          dispatch(updateUser(res.data.data));
          // dispatch(hideLoader);
        });
    } catch (error: any) {
      setTimeout(() => {
        showToast(`An error occured!\n ${error.message}\n Try again!`, "error");
      }, 2000);
      // dispatch(hideLoader);
    }
  };

  const getUserPosts = async (userId: string) => {
    const data = {
      params: {
        page: pageData.curentPostPage,
      },
    };
    try {
      const allPosts = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/user/${userId}`,
        data
      );
      setPageData((prev) => ({ ...prev, total: allPosts.data.total }));

      setUserPosts((prev: any) => [...prev, ...allPosts.data.data]);
      if (allPosts.data.data.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    } catch (error) {
      showToast("An error occured", "error");
    }
  };

  const getSavedPosts = async () => {
    if (savedPost.length !== 0) {
      setIsEmpty(false);
      savedPost.map(async (postId: string) => {
        try {
          const posts = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/posts/${postId}`
          );
          if (posts.data.data._id !== undefined) {
            setUserSavedPosts((prev: any) => [...prev, posts.data.data]);
          }
        } catch (error) {
          showToast("An error occured", "error");
        }
      });
    } else {
      setIsEmpty(true);
    }
  };
  const getUser = async () => {
    try {
      const profile = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${params.id}`
      );
      const uData = profile.data.data;

      setUserData(uData);
      activatePost();
      if (params.id === user._id) {
        setIsMainUser(true);
      } else {
        setIsMainUser(false);
      }
    } catch (error) {
      showToast("An error occured", "error");
      navigate("/home");
    }
  };

  const deletePost = async () => {
    if (delKey !== "") {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${delKey}`);
        showToast("Post deleted successfully", "success");
      } catch (error) {
        showToast("An error occured", "error");
      }
      const allPost = [...userPosts];
      const uData: any = { ...user };
      uData["post_counts"] = userData.post_counts - 1;
      dispatch(assignUser(uData));
      const comIndex = allPost.findIndex((com: any) => com._id === delKey);
      allPost.splice(comIndex, 1);
      setUserPosts(allPost);
    }
  };

  useEffect(() => {
    if (delKey !== "") {
      deletePost();
    }
  }, [delKey]);

  useEffect(() => {
    if (active === "bookmark") {
      getSavedPosts();
    } else if (active === "posts") {
      if (params.id !== undefined) {
        getUserPosts(params.id);
      } else {
        getUserPosts(user._id);
        setUserInterets(user.interests);
        setSavedPost(user.saved);
      }
    }
  }, [savedCursor, pageData.curentPostPage, params, active]);

  useEffect(() => {
    setEditData({ fullname: user.fullname, bio: user.bio });
  }, []);

  const activatePost = () => {
    const postNav: any = document.getElementById("postNav");
    postNav?.click();
  };

  useEffect(() => {
    setUserPosts([]);
    if (params.id !== undefined) {
      getUser();
    } else {
      setActive("post");
      setUserData(user);
      setSavedPost(user.saved);
      activatePost();
      setUserInterets(user.interests);
      setSavedPost(user.saved);

      if (userData._id !== "") {
        setIsMainUser(true);
      } else {
        setIsMainUser(false);
      }
    }
  }, [params]);

  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container className="mt-3">
        <div
          className="profile-top"
          style={{
            backgroundImage: `url(${
              userData.banner !== "" ? userData.banner : banner
            })`,
          }}
        >
          <div className="prt-over d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-end w-100">
              <img
                alt=""
                src={
                  userData.profile_img !== "" ? userData.profile_img : profile
                }
              />
              <div className="d-flex justify-content-between w-100">
                <div className="w-100">
                  <h6 className="text-capitalize m-0">{userData.fullname}</h6>
                  <span>@{userData.username}</span>
                  <p>{userData.bio}</p>
                </div>
                <div className="d-flex justify-content-end align-items-center prt-btn">
                  <div className="">
                    <span>Posts</span>
                    <h6>{userData.post_counts}</h6>
                  </div>
                  {isMainUser && (
                    <Button className="edit-btn" onClick={handleShow}>
                      Edit Profile
                    </Button>
                  )}
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
              <Nav.Link eventKey="posts" id="postNav">
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookmark">
                Bookmark <Badge bg="dark">{savedPost.length}</Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {((userPosts.length === 0 && isEmpty === true) ||
            (userSavedPosts.length === 0 && isEmpty === true)) && (
            <>{params.id === user._id && <EmptyData emptyType={active} />}</>
          )}
          {userPosts.length === 0 && active === "posts" && isEmpty === false ? (
            <SkeletonLayout />
          ) : userSavedPosts.length === 0 &&
            active === "bookmark" &&
            isEmpty === false ? (
            <SkeletonLayout />
          ) : (
            <></>
          )}
          {active === "posts" && (
            <div>
              <MasonryLayout
                posts={uniqBy(userPosts, "_id")}
                total={pageData.total}
                page={pageData}
                setPageFunc={setPageData}
                compType="adv"
                type="post"
                delFunc={setDelKey}
              />
            </div>
          )}
          {active === "bookmark" && (
            <div>
              <MasonryLayout
                posts={uniqBy(userSavedPosts, "_id")}
                total={savedPost.length}
                page={pageData}
                setPageFunc={setPageData}
                compType="adv"
                type="post"
              />
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
                  <span onClick={() => chooseImg("profile_img")}>
                    Change image
                  </span>
                </div>
                <div className="text-center">
                  <img
                    src={user.profile_img !== "" ? user.profile_img : profile}
                    alt=""
                    className="profm-cimg"
                  />
                </div>
              </div>
              <div className="profm-card">
                <div className="profm-tm d-flex justify-content-between align-items-center">
                  <h6>Banner</h6>
                  <span onClick={() => chooseImg("banner")}>Change banner</span>
                </div>
                <div>
                  <img
                    src={user.banner !== "" ? user.banner : banner}
                    alt=""
                    className="profm-cbanner"
                  />
                </div>
              </div>
              <div className="profm-card">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Full Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Barbara Ampofo"
                    name="fullname"
                    value={editData.fullname}
                    onChange={(e: any) => handleChangeEditData(e)}
                  />
                </FloatingLabel>
              </div>
              <div className="profm-card">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Bio"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    style={{ height: "100px" }}
                    type="text"
                    name="bio"
                    value={editData.bio}
                    onChange={(e: any) => handleChangeEditData(e)}
                    placeholder="Enter your bio.."
                  />
                </FloatingLabel>
              </div>
              <div className="profm-card">
                <div className="profm-tm d-flex justify-content-between align-items-center">
                  <h6>Interests</h6>
                </div>
                <Row>
                  {userInterets.length !== 0 &&
                    interests.map((interest, index) => (
                      <Col
                        lg={4}
                        key={index}
                        className="gap-2 mb-4 text-center"
                      >
                        <div
                          className="interest-card"
                          onClick={() => selectInterest(interest.name)}
                          style={{
                            border: userInterets.includes(interest.name)
                              ? "2px solid #000"
                              : "none",
                          }}
                        >
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
            <Button
              className="btn-sprof"
              onClick={handleEditSubmit}
              variant="primary"
            >
              Save Profile
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfilePage;
