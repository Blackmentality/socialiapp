import { Header, MasonryLayout } from "../components";
import { Container } from 'react-bootstrap';
const Home = () => {
  return (
    <div>
      <div className="header-top">
        <Header />
      </div>
      <div className="home-main mt-3">
        <Container>
          <MasonryLayout />
        </Container>
      </div>
    </div>
  );
};

export default Home;
