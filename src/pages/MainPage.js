import { Button } from "react-bootstrap";
import { auth } from "../App";
import { firestore } from "../App";
import { useDocument } from "react-firebase-hooks/firestore";
import User from "../models/User";

export function MainPage() {
  const signOut = () => auth.signOut();

  return (
    <div>
      <p>Welcome to the home page</p>
      <Button onClick={signOut}>Sign out</Button>
      <UserInfo />
    </div>
  );
}

export function UserInfo() {
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
