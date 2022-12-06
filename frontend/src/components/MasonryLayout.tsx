import Masonry from "react-masonry-css";
import HomeCard from "./HomeCard";
import NewsCard from "./NewsCard";

const MasonryLayout = ({ posts, delFunc, viewType }: any) => {
  const breakpointColumnsObj: any = {
    default: 2,
    1024: 2,
    768: 2,
    425: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {viewType === undefined &&
          posts !== undefined &&
          posts.map((post: any, index: any) => (
            <HomeCard postData={post} key={index} func={delFunc} />
          ))}
        {viewType === "news" &&
          posts !== undefined &&
          posts.map((post: any, index: any) => (
            <NewsCard newsData={post} key={index} />
          ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
