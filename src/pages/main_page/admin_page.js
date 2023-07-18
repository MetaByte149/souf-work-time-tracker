import { Button } from "react-bootstrap";
import { UserInfo } from "./user_info";
import { auth } from "../../App";

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
