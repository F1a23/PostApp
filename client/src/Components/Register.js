import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";
import logo from "../Images/logo-t.png";

import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { registerUser } from "../Features/UserSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  //Retrieve the current value of the state and assign it to a variable.
  const userList = useSelector((state) => state.users.value);
  //Create the state variables
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const dispatch = useDispatch(); //every time we want to call an action, make an action happen
  const navigate = useNavigate(); //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook

  // Handle form submission
  const onSubmit = (data) => {
    try {
      // You can handle the form submission here
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log("Form Data", data);
      alert("Validation all good.");
      dispatch(registerUser(userData)); // Dispatch an action to add a new user by passing the user data to the Redux store
      navigate("/login"); //redirect to login component
    } catch (error) {
      console.log("Error.");
    }
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  const handleUpdate = (email) => {
    const userData = {
      name: name, //create an object with the values from the state variables
      email: email,
      password: password,
    };
    dispatch(updateUser(userData)); //use the useDispatch hook to dispatch an action, passing as parameter the userData
  };

  return (
    <div>
      {" "}
      <Container>
        <Form className="box" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={5}>
              <img src={logo} className="contactusimg" />
            </Col>

            <Col md={7} className="form-groupsnnn">
              <FormGroup>
                <Label for="name">Name</Label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  {...register("confirmPassword", {
                    onChange: (e) => setconfirmPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </FormGroup>
              <FormGroup>
                <Button className="lbutton">Register</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
