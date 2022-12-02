import { Header, MasonryLayout } from "../components";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { uniqBy } from "lodash";
import { EmptyData, SkeletonLayout } from "../components/UIHelpers";
import { useSelector, useDispatch } from "react-redux";
import { assignUser } from "../redux/features/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const { addToast } = useToasts();
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };
  const [isEmpty, setIsEmpty] = useState(false);
  const [fypData, setFypData]: any = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [delKey, setDelKey] = useState("");
  const [pageData, setPageData]: any = useState({
    fypPage: 1,
    searchPage: 1,
    totalFypPage: 0,
  });

  const getUserInterests = async () => {
    const data = {
      params: {
        page: fypData.length === 0 ? 1 : pageData.fypPage,
      },
    };
    try {
      const getData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/interest`,
        data
      );
      const resData = getData.data;
      setPageData((oldData: any) => ({
        ...oldData,
        totalFypPage: resData.total,
      }));

      setFypData((fyD: any) => [...fyD, ...resData.data]);
      handleIsEmpty(resData.data);
    } catch (error) {
      showToast("An error occured", "error");
    }
  };

  const handleIsEmpty = (data: any[]) => {
    if (data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const getSearchPost = async () => {
    setFypData([]);
    const data = {
      params: {
        q: searchInput,
        page: fypData.length === 0 ? 1 : pageData.searchPage,
      },
    };
    try {
      const searchRes = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/search`,
        data
      );
      setFypData(searchRes.data.data);
      setPageData((prev: any) => ({
        ...prev,
        totalPostsDocs: searchRes.data.total,
      }));
      if (searchRes.data.data.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    } catch (error: any) {
      showToast("An error occured", "error");
    }
  };

  useEffect(() => {
    getUserInterests();
  }, []);

  const deletePost = async () => {
    if (delKey !== "") {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${delKey}`);
        showToast("Post deleted successfully", "success");
      } catch (error) {
        showToast("An error occured", "error");
      }
      const allPost = [...fypData];
      const uData: any = { ...user };
      uData["post_counts"] = user.post_counts - 1;
      dispatch(assignUser(uData));
      const comIndex = allPost.findIndex((com: any) => com._id === delKey);
      allPost.splice(comIndex, 1);
      setFypData(allPost);
    }
  };

  useEffect(() => {
    if (delKey !== "") {
      deletePost();
    }
  }, [delKey]);

  useEffect(() => {
    if (searchInput !== "") {
      getSearchPost();
    } else {
      setFypData([]);
      getUserInterests();
    }
  }, [searchInput]);

  return (
    <div>
      <div className="header-top">
        <Header searchFunc={setSearchInput} />
      </div>
      <div className="home-main mt-3">
        <Container>
          {fypData.length === 0 && isEmpty === true && (
            <EmptyData emptyType="post" />
          )}
          {fypData.length === 0 && isEmpty === false && <SkeletonLayout />}
          {fypData.length !== 0 && (
            <MasonryLayout
              posts={uniqBy(fypData, "_id")}
              total={pageData.totalFypPage}
              page={pageData}
              setPageFunc={setPageData}
              compType="expl"
              type="post"
              delFunc={setDelKey}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;
