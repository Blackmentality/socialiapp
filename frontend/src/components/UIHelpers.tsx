import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./components.scss";
import Masonry from "react-masonry-css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const EmptyData = ({ emptyType }: any) => {
  const navigate = useNavigate();
  return (
    <div className="emptyContainer">
      <div className="emptyCard">
        {emptyType === "post" && <h6>No posts yet😔</h6>}
        {emptyType === "saved" && <h6>No saved posts yet😔</h6>}
        {emptyType === "account" && (
          <h6>
            No accounts found 😔 <br />
            Search again...
          </h6>
        )}
        {(emptyType === "post" || emptyType === "saved") && (
          <div className="mb-2">
            <span>Click the button below to: 👇🏽</span>
          </div>
        )}
        {emptyType === "post" && (
          <Button
            className="no-border no-box-shadow"
            onClick={() => navigate("/add-post")}
          >
            Add post
          </Button>
        )}
        {emptyType === "saved" && (
          <Button
            className="no-border no-box-shadow"
            onClick={() => navigate("/home")}
          >
            Go to Timeline
          </Button>
        )}
      </div>
    </div>
  );
};

const SkeletonCard = ({ sCount }: any) => {
  return (
    <div className="post-card">
      <div className="post-card-top">
        <div>
          <Skeleton count={1} width="70%" />
          <Skeleton count={1} width="40%" />
          <Skeleton count={1} width="80%" />
        </div>
      </div>
      <div className="post-card-mid">
        <Skeleton count={1} width="100%" />
        <div>
          <Skeleton count={1} width="100%" height={100} />
        </div>
      </div>
      <div className="post-card-bot d-flex justify-content-between align-items-center">
        <Skeleton count={1} width="40%" />
        <Skeleton count={1} width="70%" />
      </div>
    </div>
  );
};

const SkeletonLayout = () => {
  const skeletonArr = Array.from({ length: 10 }, (e, i) => i);
  const breakpointColumnsObj: any = {
    default: 2,
    1024: 2,
    768: 2,
    425: 1,
  };
  return (
    <div className="home-timeline mt-3">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {skeletonArr.map((arr: any, index: any) => (
          <SkeletonCard sCount={index} key={index} />
        ))}
      </Masonry>
    </div>
  );
};

export { SkeletonLayout, EmptyData };
