import "./App.scss";
import AllRoutes from "./routes/AllRoutes";
import { ToastProvider } from "react-toast-notifications";
import { Loader } from "./components";
import { useSelector } from "react-redux";

const App = () => {
  const { loading } = useSelector((store: any) => store.loader);
  return (
    <div className="container-fluid p-0">
      <Loader loading={loading} />
      <ToastProvider>
        <AllRoutes />
      </ToastProvider>
    </div>
  );
};

export default App;
