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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import User from "./User";
import { updateUserProfile } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import { Link } from "react-router-dom";
import { logout } from "../Features/UserSlice";
const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const handleUpdate = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Prepare the user data object with the current user's email and updated details
    const userData = {
      email: user.email, // Retrieve email from the Redux store
      name: userName, // Get the updated name from the state variable
      password: pwd, // Get the updated password from the state variable
      profilePic: profilePic,
    };
    console.log(userData);
    // Dispatch the updateUserProfile action to update the user profile in the Redux store
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
    navigate("/profile");
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/login");
  };
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="ph">
          <User />

          <button onClick={handlelogout} className="lbutton">
            Logout
          </button>
        </Col>
        <Col md={9}>
          <Form onSubmit={handleUpdate} className="box">
            <FormGroup className="form-groupsn">
              <Label>Upload Photo</Label>
              <Input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
              />
            </FormGroup>

            <FormGroup className="form-groupsn">
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name..."
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="form-groupsn">
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="form-groupsn">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password..."
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <button className="lbutton" type="submit">
                Update Profile
              </button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
