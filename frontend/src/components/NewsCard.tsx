import "./components.scss";
import TimeAgo from "react-timeago";
import { Button } from "react-bootstrap";

const NewsCard = ({ newsData }: any) => {
  const openNews = (link: string) => {
    const ahref = document.createElement("a");
    ahref.target = "_blank";
    ahref.href = link;
    ahref.click();
  };
  return (
    <div className="newsCard">
      <img src={newsData.urlToImage} alt="news_img" />
      <div>
        <h6 className="m-0">{newsData.title}</h6>
        <p className="m-0">Author: {newsData.author}</p>
        <span>
          Published Date:
          {newsData !== undefined && <TimeAgo date={newsData.publishedAt} />}
        </span>
        <div className="d-flex justify-content-end">
          <Button
            className="newsBtn no-border"
            onClick={() => openNews(newsData.url)}
          >
            Read News
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
