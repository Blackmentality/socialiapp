import { useState } from "react";
import Masonry from "react-masonry-css";
import posts from "../constant/posts";
import HomeCard from "./HomeCard";

const MasonryLayout = () => {
  const breakpointColumnsObj: any = {
    default: 2,
    1024: 2,
    768: 2,
    425: 1,
  };

  // const [posts, setPosts] = useState([1, 2, 4, 5, 6, 7, 6]);
  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts.map((post: any, index: any) => (
          <HomeCard postData={post} key={index} />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
