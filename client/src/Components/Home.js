import logo from "../Images/logo-t.png";
import Posts from "./Posts";
import SharePosts from "./SharePost";
import Location from "./Location";
import User from "./User";
import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  return (
    <Container className="form-groupsn">
      <br></br>
      <br></br>
      <Row>
        <Col md={8}>
          <SharePosts />
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col md={3}>
          <Location />
        </Col>
        <Col md={9}>
          <Posts />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
