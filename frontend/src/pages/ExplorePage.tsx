import { Header, MasonryLayout } from "../components";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SkeletonLayout } from "../components/UIHelpers";
import { shuffle } from "lodash";
const ExplorePage = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const user = useSelector((state: any) => state.auth.user);
  const [activeCategory, setActiveCategory] = useState(user.interests[0]);
  const getNewsByInterest = async () => {
    // axios.defaults.withCredentials = true;
    try {
      const getData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/news/${activeCategory}`
      );
      setNewsData(getData.data.data);
      setIsEmpty(false);
    } catch (error) {
      console.log(error);
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    setNewsData([]);
    getNewsByInterest();
  }, [activeCategory]);

  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container>
        <div className="d-flex justify-content-center py-3">
          <ButtonGroup aria-label="Basic example">
            {user.interests.map((interest: string) => (
              <Button
                variant={interest === activeCategory ? "dark" : "secondary"}
                key={interest}
                onClick={() => setActiveCategory(interest)}
              >
                {interest}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div>
          {newsData.length === 0 && isEmpty === false && <SkeletonLayout />}
          {newsData.length !== 0 && (
            <MasonryLayout posts={shuffle(newsData)} viewType="news" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default ExplorePage;
