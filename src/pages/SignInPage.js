import firebase from "firebase/compat/app";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { auth } from "../App";

export function SignInPage() {
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
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
                  <h2 className="fw-bold mb-4 text-uppercase ">🔥☀ Upcaller ☀🔥</h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicUsername"
                      >
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="username"
                          placeholder="Enter username" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" onClick={signIn}>
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
