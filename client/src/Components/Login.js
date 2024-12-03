import {
  Form,
  Input,
  FormGroup,
  Label,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";

import logo from "../Images/logo-t.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Features/UserSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Retrieve the current value of the state from the store, name of state is users with a property user
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [user, isError, isSuccess]);

  return (
    <div>
      <Container>
        <Form className="boxx">
          <Row>
            <Col md={4}>
              <img src={logo} className="contactusimg" />
            </Col>

            <Col md={8} className="form-groupsn">
              <FormGroup>
                <Label for="email">Email</Label>

                <input
                  id="email"
                  name="email"
                  placeholder="Enter email..."
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password" className="formlogin">
                  Password
                </Label>

                <input
                  id="password"
                  name="password"
                  placeholder="Enter password..."
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button onClick={() => handleLogin()} className="lbutton">
                  Login
                </Button>
              </FormGroup>
              <p className="ph">
                No Account? <Link to="/register">Sign Up now.</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
