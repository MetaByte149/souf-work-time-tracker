import solarPanelBackground from "./assets/solar_panels.jpg";

import User from "./models/User";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

firebase.initializeApp({
  apiKey: "AIzaSyBnx-2F4AoRsDT1uAxskpY6g4RUGNa8iz0",
  authDomain: "souf-work-time-tracker.firebaseapp.com",
  projectId: "souf-work-time-tracker",
  storageBucket: "souf-work-time-tracker.appspot.com",
  messagingSenderId: "1031994206693",
  appId: "1:1031994206693:web:d406b48634946c4e83670c",
  measurementId: "G-1LCDRSGV5K",
});

const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div
      className="text-center"
      style={{
        backgroundImage: `url(${solarPanelBackground}) `,
        "background-size": "cover",
      }}
    >
      <section>{user ? <MainPage /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
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
                          placeholder="Enter username"
                        />
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

function MainPage() {
  const signOut = () => auth.signOut();

  return (
    <div>
      <p>Welcome to the home page</p>
      <Button onClick={signOut}>Sign out</Button>
      <UserInfo />
    </div>
  );
}

function UserInfo() {
  const myUserRef = firestore.collection("users").doc("_example");
  const [snapshot, isLoading] = useDocument(myUserRef);
  if (!isLoading) {
    const user = User.fromObject(snapshot.data());
    console.log(user);
    return (
      <div>
        <p>id: {user.id}</p>
        <p>name: {user.name}</p>
        <p>password: {user.password}</p>
        <p>timeSpent: {user.timeSpent}</p>
        <p>admin: {user.admin.toString()}</p>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default App;
