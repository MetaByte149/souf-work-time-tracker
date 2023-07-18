import { Button } from "react-bootstrap";
import { auth, userRepo } from "../../App";
import { firestore } from "../../App";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";
import User from "../../models/user";
import { UserInfo } from "./user_info";
import { useEffect, useState } from "react";

export function MainPage(props) {
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

  const signOut = () => auth.signOut();
  return (
    <div>
      <p>Welcome to the home page</p>
      <Button onClick={signOut}>Sign out</Button>
      <UserInfo authUser={authUser} user={user} liveTimeSpent={liveTimeSpent} />
    </div>
  );
}
