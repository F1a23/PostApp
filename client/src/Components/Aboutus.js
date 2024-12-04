import { Col, Container, Row } from "reactstrap";
import logo from "../images/logo.png";
import Header from "./Header";
const AboutUS = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <img src={logo} className="styled-image"></img>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p className="ph">
            HOMEHERO: is a digital platform designed to connect homeowners with
            skilled professionals for a wide range of services, including
            plumbing, electrical repairs, cleaning, gardening, and appliance
            maintenance. The app provides a seamless experience by allowing
            users to browse service categories, book appointments, and track
            real-time progress. It ensures convenience and reliability by
            providing features like user reviews, transparent pricing, and
            secure payment options. Whether a one-time fix or routine
            maintenance, the app bridges the gap between service providers and
            customers, offering a hassle-free way to manage household needs from
            the comfort of their homes.
          </p>
          <h6 className="ph">
            As HOMEHERO team we welcome you to be part of our family and benefit
            from the services available.
          </h6>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUS;
