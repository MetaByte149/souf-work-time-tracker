import { Button, Container, Col, Row } from "react-bootstrap";
import { auth } from "../../App";

export function AdminPage(props) {

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
