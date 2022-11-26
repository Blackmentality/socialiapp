import { InfinitySpin } from "react-loader-spinner";
import "./components.scss";
const Loader = ({ loading }: any) => {
  return (
    <div
      className="loader-main"
      style={{ display: loading ? "block" : "none" }}
    >
      <InfinitySpin width="200" color="#000" />
    </div>
  );
};

export default Loader;
