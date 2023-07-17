import { Button, Container } from "react-bootstrap";
import { auth } from "../App";
import { firestore } from "../App";
import { useDocument } from "react-firebase-hooks/firestore";
import User from "../models/User";

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

  const myUserRef = firestore.collection("users").doc(authUser.uid);
  const [snapshot, isLoading] = useDocument(myUserRef);
  //TODO: put user in state
  if (!isLoading) {
    const user = User.fromObject(snapshot.data());

    // TODO FIX THIS HUNGRY MESS
    // // minute updater
    // setInterval(async () => {
    //   if (user) myUserRef.update(user.toObject());
    // }, 60000);

    // // second updater
    // setInterval(() => {
    //   if (user) user.timeSpent += 1000;
    // }, 1000);

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
            <p>admin: {user.admin.toString()}</p>
          </Container>
        </Container>
      </Container>
    );
  } else {
    return <p>Loading...</p>;
  }
}
