import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Form,
  Table,
} from "reactstrap";
import contactus from "../images/contactus.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePost } from "../Features/PostSlice";

const Contactus = () => {
  const [postMsg, setpostMsg] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const email = useSelector((state) => state.users.user.email);

  const handlePost = async () => {
    // Validate that postMsg is not empty

    if (!postMsg.trim()) {
      alert("Post message is required."); // Display an alert or set an error state

      return; // Exit the function early if validation fails
    }

    const postData = {
      postMsg: postMsg,
      email: email,
    };

    dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
    setpostMsg("");
  };

  return (
    <Container>
      <div className="loginnn-container">
        <Form className="box">
          <Row>
            <h2 className="h22">Contact Us</h2>
          </Row>
          <br></br>
          <br></br>

          <Row>
            <Col md={4}>
              <FormGroup>
                <img src={contactus} className="contactusimg"></img>
              </FormGroup>
            </Col>
            <Col md={8}>
              <p className="ph">
                Share your thoughts, suggestions and comments here.
              </p>
              <FormGroup className="textareainput">
                <Input
                  id="share"
                  name="share"
                  placeholder="Share your thoughts..."
                  type="textarea"
                  value={postMsg}
                  onChange={(e) => setpostMsg(e.target.value)}
                />
              </FormGroup>
              <Button className="loginbutton" onClick={() => handlePost()}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default Contactus;
