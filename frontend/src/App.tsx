import "./App.scss";
import AllRoutes from "./routes/AllRoutes";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <div className="container-fluid p-0">
      <ToastProvider>
        <AllRoutes />
      </ToastProvider>
    </div>
  );
};

export default App;
