import { userRepo } from "../../App";
import { EmployeePage } from "./employee_page";
import { useState } from "react";
import { AdminPage } from "./admin_page";
import {
  Col,
  Button,
  Spinner,
  Row,
  Container,
  Card,
  Form,
} from "react-bootstrap";

export function MainPage(props) {
  const { authUser } = props;

  const [user, setUser] = useState(null);

  // Only look up user if there is no user
  if (!user) {
    userRepo.getUserById(authUser.uid).then((user) => setUser(user));
  }

  if (!user) return <Spinner animation="border" role="status" />;
  if (user.admin) return <AdminPage />;
  return <EmployeePage user={user} />;
}
