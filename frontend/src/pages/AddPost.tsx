import { Container, FloatingLabel, Form, Button } from "react-bootstrap";
import { Header } from "../components";
import { lifestyle } from "../constant/assets";
import interests from "../constant/interest";
import "./pages.scss";
const AddPost = () => {
  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <Container className="mt-3">
        <div className="add-main">
          <div className="add-card">
            <h5 className="m-0 mb-3">Add a post</h5>
            <FloatingLabel
              className="mb-3"
              controlId="floatingTextarea2"
              label="What's on your mind?"
            >
              <Form.Control
                as="textarea"
                placeholder="What's on your mind?"
                style={{ height: "150px" }}
              />
            </FloatingLabel>
            <div className="adp mb-3">
                <img src={lifestyle} alt="" width={60} height={60} />
            </div>
            <Form.Select className="mb-3" aria-label="Default select example">
              <option>Select an interest</option>
              {interests.map((interest, index) => (
                <option value={interest.name} key={index}>
                  {interest.name}
                </option>
              ))}
            </Form.Select>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddPost;
