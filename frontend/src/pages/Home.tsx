import { Header, MasonryLayout } from "../components";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { uniqBy } from "lodash";

const Home = () => {
  const { addToast } = useToasts();
  const showToast = (message: string, toastType: any) => {
    addToast(message, {
      appearance: toastType,
      autoDismiss: true,
    });
  };
  const [isEmpty, setIsEmpty] = useState(false);
  const [fypData, setFypData]: any = useState([]);
  const [pageData, setPageData]: any = useState({
    fypPage: 1,
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
      console.log(resData);

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

  useEffect(() => {
    getUserInterests();
  }, []);

  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <div className="home-main mt-3">
        <Container>
          <MasonryLayout
            posts={uniqBy(fypData, "_id")}
            total={pageData.totalFypPage}
            page={pageData}
            setPageFunc={setPageData}
            compType="expl"
            type="quote"
          />
        </Container>
      </div>
    </div>
  );
};

export default Home;
