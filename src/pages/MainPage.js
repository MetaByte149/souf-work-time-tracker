import { Button, Container } from "react-bootstrap";
import { auth, userRepo } from "../App";
import { firestore } from "../App";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";
import User from "../models/user";
import { useEffect, useState } from "react";

export function MainPage(props) {
  const { authUser } = props;

  const signOut = () => auth.signOut();

  return (
    <div>
      <p>Welcome to the home page</p>
      <Button onClick={signOut}>Sign out</Button>
      <UserInfo authUser={authUser} />
    </div>
  );
}

export function UserInfo(props) {
  const { authUser } = props;

  const [user, setUser] = useState(null);

  // Only look up user if there is no user
  if (!user)
    userRepo.getUserById(authUser.uid).then((v) => {
      setUser(v);
    });

  if (user)
    return (
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">
            Welcome <i>{user.name}</i> Good luck! 🥰
          </h1>
          <Container>
            <p>id: {user.id}</p>
            <p>name: {user.name}</p>
            <p>password: {user.password}</p>
            <p>timeSpent: {user.timeSpent}</p>
            <p>admin: {JSON.stringify(user.admin)}</p>
          </Container>
        </Container>
      </Container>
    );
  else <p>Loading...</p>;

  // // second updater
  // setInterval(() => {
  //   if (user) user.timeSpent += 1000;
  // }, 1000);
}
