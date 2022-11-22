import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constant/assets";
import { SiAddthis } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { unAssignUser } from "../redux/features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const navigate = useNavigate();

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
            <Link className="nav-link" to={"/add-post"}>
              <SiAddthis />
            </Link>
            <Link className="nav-link" to={"/profile"}>
              <FaUserCircle />
            </Link>
            <Nav.Link className="nav-link" onClick={handleLogout}>
              <IoMdLogOut />
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for post..."
              className="me-2"
              aria-label="Search"
            />
            <Button className="search-btn">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
