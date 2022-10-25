import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logo } from "../constant/assets";
import { SiAddthis } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Sociali
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Link className="nav-link" to={"/home"}>
              <AiFillHome />
            </Link>
            <Link className="nav-link" to={"/add-post"}>
              <SiAddthis />
            </Link>
            <Link className="nav-link" to={"/profile"}>
              <FaUserCircle />
            </Link>
            
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
