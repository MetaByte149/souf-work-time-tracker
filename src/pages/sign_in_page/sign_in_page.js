import React, { useRef } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { auth } from "../../App";

export function SignInPage() {
  const usernameTextRef = useRef(null);
  const passwordTextRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();

    const usernameText = usernameTextRef.current.value;
    const passwordText = passwordTextRef.current.value;
    console.log(usernameText);
    // TODO: give feedback to user if something goes wrong
    if (usernameText.trim() === "" || passwordText.trim() === "") return;
    const emailText = usernameText + "@soufUpcaller.com";

    auth.signInWithEmailAndPassword(emailText, passwordText);
  };

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

                      <div className="d-grid">
                        <Button type="sumbit" variant="primary">
                          Login
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
    </div>
  );
}
