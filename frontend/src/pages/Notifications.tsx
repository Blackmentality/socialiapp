import { Header } from "../components";
import { Container } from "react-bootstrap";
import "./pages.scss";
import { BsFillHeartFill, BsFillChatSquareDotsFill } from "react-icons/bs";

const Notifications = () => {
  const allNotifications = [
    {
      id: "not1",
      message: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      assumenda voluptatum doloremque mollitia, nobis itaque.
      Libero ad asperiores.`,
      type: "like",
      time: "2 days ago",
    },
    {
      id: "not2",
      message: `doloremque mollitia, nobis itaque.
        Libero ad asperiores.`,
      type: "comment",
      time: "2 hours ago",
    },
    {
      id: "not3",
      message: `Nana Akuffo Addo liked your post.`,
      type: "like",
      time: "3mins ago",
    },
  ];
  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container>
        <div className="viewp-main">
          <div className="post-card">
            <h5 className="notheader">Notifications</h5>
            {allNotifications.map((notify, index) => (
              <div
                className="noti-card d-flex justify-content-start align-items-center"
                key={`${index}${notify.id}`}
              >
                <div className="noti-icon">
                  {notify.type === "like" ? (
                    <BsFillHeartFill />
                  ) : notify.type === "comment" ? (
                    <BsFillChatSquareDotsFill />
                  ) : null}
                </div>
                <div>
                  <h6>{notify.message}</h6>
                  <span>{notify.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Notifications;
