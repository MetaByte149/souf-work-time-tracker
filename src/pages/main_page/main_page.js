import { Button } from "react-bootstrap";
import { auth } from "../../App";
import { firestore } from "../../App";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";
import User from "../../models/user";
import { UserInfo } from "./user_info";

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
