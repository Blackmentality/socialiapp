import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../constant/assets";
import { SiAddthis } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle, FaGlobeAfrica, FaSignOutAlt } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { unAssignUser } from "../redux/features/authSlice";
import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";

const Header = ({ searchFunc }: any) => {
  const dispatch = useDispatch();
  const [search, setSearchText] = useState("");
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
      dispatch(unAssignUser());
      localStorage.removeItem("sociali_user");
      navigate("/auth/login");
      addToast("Logout Successful.\n See you again🤩!", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("An error occured.\n Try again!", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (location.pathname === "/home") {
      searchFunc(search);
    } else if (search !== "" && location.pathname !== "/home") {
      navigate("/home");
    }
  }, [search]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/home" className="navbar-brand">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Sociali
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto nav-size"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className="nav-link" to={"/home"}>
              <AiFillHome />
            </Link>
            <Link className="nav-link" to={"/profile"}>
              <FaUserCircle />
            </Link>
            <Link className="nav-link" to={"/add-post"}>
              <SiAddthis />
            </Link>
            <Link className="nav-link" to={"/notifications"}>
              <BsFillBellFill />
            </Link>
            <Link className="nav-link" to={"/explore"}>
              <FaGlobeAfrica />
            </Link>
          </Nav>
          <div className="d-flex nav-size align-items-center">
            <Form>
              <DebounceInput
                placeholder="Search for post..."
                aria-label="search"
                aria-describedby="basic-addon1"
                className="form-control"
                minLength={1}
                debounceTimeout={1500}
                onChange={(e: any) => setSearchText(e.target.value)}
              />
            </Form>

            <Nav.Link className="nav-link ms-3" onClick={handleLogout}>
              <FaSignOutAlt />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
