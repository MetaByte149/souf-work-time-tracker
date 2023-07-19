import React, { useRef, useState } from "react";

import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import { userRepo } from "../../App";
import firebase from "firebase/compat/app";
import { msToRealTime } from "./employee_page";

export function AdminPage(props) {
  const auth = firebase.auth();

  return (
    <div>
      <Button onClick={() => auth.signOut()}>Sign out</Button>
      <Row>
        <Col>
          <NewAccountForm />
        </Col>
        <Col>
          <UserComponents />
        </Col>
      </Row>
    </div>
  );
}

export function UserComponents() {
  const [users, setUsers] = useState([]);

  if (users.length > 1) {
    return (
      <Row>
        {users
          .sort((a, b) => b.timeSpent - a.timeSpent)
          .map((user) =>
            EmployeeCard(
              user.id,
              user.name,
              user.timeSpent,
              user.relaxTimeSpent,
              user.trainingTimeSpent
            )
          )}
      </Row>
    );
  }

  userRepo.getAllNonAdminUsers().then((users) => setUsers(users));
  return <Spinner animation="border" role="status" />;
}

export function EmployeeCard(
  id,
  name,
  timeSpent,
  relaxTimeSpent,
  trainingTimeSpent
) {
  return (
    <Col
      key={id}
      className="m-2 mx-4 p-2 bg-light rounded-3 border border-info"
      style={{ float: "left" }}
    >
      <p>name: {name}</p>
      <p>
        <b>time worked:</b> {msToRealTime(timeSpent)}
      </p>
      <p>
        <b>time relaxed:</b> {msToRealTime(relaxTimeSpent)}
      </p>
      <p>
        <b>time trained:</b> {msToRealTime(trainingTimeSpent)}
      </p>
    </Col>
  );
}

export function NewAccountForm() {
  const usernameTextRef = useRef(null);
  const passwordTextRef = useRef(null);
  const adminCheckboxRef = useRef(null);

  const [infoForUser, setInfoForUser] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const usernameText = usernameTextRef.current.value;
    const passwordText = passwordTextRef.current.value;
    const adminCheckBox = adminCheckboxRef.current;
    if (
      usernameText.trim() === "" ||
      passwordText.trim() === "" ||
      passwordText.length < 6
    )
      return setInfoForUser(
        "Make sure all fields are filled in and password has to be larger than 6 characters"
      );
    const emailText = usernameText + "@soufUpcaller.com";
    const auth = firebase.auth();

    //TODO: use cloud function to create new account
    auth
      .createUserWithEmailAndPassword(emailText, passwordText)
      .then((a) =>
        userRepo.createNewUser(
          a.user.uid,
          usernameText,
          passwordText,
          adminCheckBox.checked
        )
      )
      .catch((err) => {
        setInfoForUser(
          "Something went wrong with the database, ask dev for help"
        );
        console.error(err);
      });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-info"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-4 text-uppercase ">Add new user</h2>
                <div className="mb-3">
                  <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label className="text-center">Username</Form.Label>
                      <Form.Control
                        type="username"
                        placeholder="Enter username"
                        ref={usernameTextRef}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={passwordTextRef}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdminToggle">
                      <Form.Label>Admin</Form.Label>
                      <Form.Control
                        className="form-check-input"
                        type="checkbox"
                        ref={adminCheckboxRef}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-danger">
                        {infoForUser}
                      </Form.Label>
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="sumbit" variant="info">
                        Add user
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
