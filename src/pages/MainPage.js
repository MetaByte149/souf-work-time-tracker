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
  const [liveTimeSpent, setLiveTimeSpent] = useState(0);

  // Only look up user if there is no user
  if (!user) {
    userRepo.getUserById(authUser.uid).then((user) => {
      setUser(user);
      setLiveTimeSpent(user.timeSpent);
    });
  }

  useEffect(() => {
    let _minuteInterval;
    let _secondInterval;
    if (user) {
      _minuteInterval = setInterval(() => {
        // console.log(`UPDATING USER WITH ID: ${user.id}`);
        userRepo.updateUser(user);
      }, 60000);

      _secondInterval = setInterval(() => {
        user.timeSpent += 1000;
        setLiveTimeSpent(user.timeSpent);
      }, 1000);
    }

    return () => {
      clearInterval(_minuteInterval);
      clearInterval(_secondInterval);
    };
  }, [user]);

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
            <p>timeSpent: {msToRealTime(liveTimeSpent)}</p>
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

function msToRealTime(ms) {
  const seconds = (ms / 1000) % 60;
  const minutes = (ms / 60000) % 60;
  const hours = (ms / 3600000) % 60;
  return `${Math.floor(hours)}h:${Math.floor(minutes)}m:${Math.floor(
    seconds
  )}s`;
}
