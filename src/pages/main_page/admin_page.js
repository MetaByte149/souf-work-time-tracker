import { Button, Container, Col, Row } from "react-bootstrap";
import { UserInfo } from "./user_info";
import { auth } from "../../App";

export function AdminPage(props) {
  const signOut = () => auth.signOut();

  return (
    <div>
      <UserComponents />
    </div>
  );
}

export function UserComponents() {
  return (
    <Container>
      <Row>
        <Col >A</Col>
        <Col >B</Col>
      </Row>
      <Row>
        <Col >C</Col>
        <Col >D</Col>
        <Col >E</Col>
      </Row>
    </Container>
  );
}
