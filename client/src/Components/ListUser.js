import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useState } from "react";

import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerUser } from "../Features/UserSlice";
const ListUsers = () => {
  // Retrieve the current value of the state and assign it to a variable.
  const userList = useSelector((state) => state.users.value);

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <Table>
            <tbody>
              {userList.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button>Delete User</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListUsers;
