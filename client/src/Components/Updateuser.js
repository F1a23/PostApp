import {
  Container,
  Col,
  Row,
  Form,
  Input,
  Button,
  FormGroup,
  Table,
} from "reactstrap";
import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser, udpateUser } from "../Features/UserSlice";
import { useParams } from "react-router-dom";

const Updateuser = () => {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const { user_email, user_name, user_password } = useParams();

  const [name, setname] = useState(user_name);
  const [email, setemail] = useState(user_email);
  const [password, setpassword] = useState(user_password);
  const [confirmPassword, setconfirmPassword] = useState(user_password);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });
  //function of the button:

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };
  const handleUpdate = () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(udpateUser(userData));
  };

  return (
    <div>
      <Container fluid>
        <br />
        <br />

        <h1 className="h">Update</h1>
        <Form
          onSubmit={handleSubmit((data) => {
            handleUpdate(data);
          })}
        >
          <Row>
            <Col md={3}>
              <input
                id="name"
                name="name"
                placeholder="Enter your name..."
                type="text"
                value={name}
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
              ></input>
              <p className="error">{errors.name?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <input
                id="exampleEmail"
                name="email"
                placeholder="Enter your email..."
                type="email"
                value={email}
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
              ></input>
              <p className="error">{errors.email?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <input
                id="examplePassword"
                name="Password"
                placeholder="Enter your Password..."
                type="password"
                value={password}
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              ></input>
              <p className="error">{errors.password?.message}</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <input
                id="examplePassword"
                name="ConforimPassword"
                placeholder="Confirm your Password..."
                type="password"
                value={confirmPassword}
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
              ></input>
              <p className="error">{errors.confirmPassword?.message}</p>

              <Button>Update</Button>
            </Col>{" "}
            <Col md={6}>
              List of Users
              <Table>
                <tbody>
                  {userList.map((user) => (
                    <tr key={user.email}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>

                      <td>
                        <Button onClick={() => handleUpdate(user.email)}>
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Form>
        <Row></Row>
      </Container>
    </div>
  );
};

export default Updateuser;
