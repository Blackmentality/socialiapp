import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ post }: any) => {
  const shareSize = 25;
  const postUrl = `http://sociali.com/post/${post._id}`;
  return (
    <>
      <FacebookShareButton
        url={postUrl}
        quote={post.caption}
        hashtag={`#${post.category}`}
      >
        <FacebookIcon round={true} size={shareSize} />
      </FacebookShareButton>
      <WhatsappShareButton url={postUrl} title={post.caption}>
        <WhatsappIcon round={true} size={shareSize}></WhatsappIcon>
      </WhatsappShareButton>
      <LinkedinShareButton
        title="Sociali - Just your interests"
        summary={post.caption}
        url={postUrl}
        source={postUrl}
      >
        <LinkedinIcon round={true} size={shareSize}></LinkedinIcon>
      </LinkedinShareButton>
      <TwitterShareButton
        url={postUrl}
        hashtags={[`${post.category}`]}
        title={post.post}
      >
        <TwitterIcon round={true} size={shareSize}></TwitterIcon>
      </TwitterShareButton>
      <TelegramShareButton url={postUrl} title="Sociali - Just your interests">
        <TelegramIcon round={true} size={shareSize}></TelegramIcon>
      </TelegramShareButton>
    </>
  );
};

export default ShareButtons;
