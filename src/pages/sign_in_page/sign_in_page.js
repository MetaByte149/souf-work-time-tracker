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
import { auth } from "../../App";

export function SignInPage() {
  const usernameTextRef = useRef(null);
  const passwordTextRef = useRef(null);

  const [infoForUser, setInfoForUser] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const signIn = (e) => {
    e.preventDefault();

    const usernameText = usernameTextRef.current.value;
    const passwordText = passwordTextRef.current.value;

    if (usernameText.trim() === "" || passwordText.trim() === "")
      return setInfoForUser("Make sure to fill in both fields!");

    const emailText = usernameText + "@soufUpcaller.com";

    setIsLoggingIn(true);
    auth.signInWithEmailAndPassword(emailText, passwordText).catch((_) => {
      setIsLoggingIn(false);
      setInfoForUser("Incorrect login information");
    });
  };

  let loginButton = isLoggingIn ? (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />{" "}
    </Button>
  ) : (
    <Button type="sumbit" variant="primary">
      Login
    </Button>
  );

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-4 text-uppercase ">
                    🔥☀ Upcaller ☀🔥
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={signIn}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicUsername"
                      >
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="username"
                          placeholder="Enter username"
                          ref={usernameTextRef}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passwordTextRef}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="text-danger">
                          {infoForUser}
                        </Form.Label>
                      </Form.Group>

                      <div className="d-grid">{loginButton}</div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
