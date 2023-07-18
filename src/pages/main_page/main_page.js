import { userRepo } from "../../App";
import { EmployeePage } from "./employee_page";
import { useEffect, useState } from "react";
import { AdminPage } from "./admin_page";

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
  if (!user) return <p> Loading... </p>;
  if (user.admin) return <AdminPage />;
  return <EmployeePage user={user} liveTimeSpent={liveTimeSpent} />;
}
