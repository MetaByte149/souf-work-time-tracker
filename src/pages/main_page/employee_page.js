import { Container, Button } from "react-bootstrap";
import firebase from "firebase/compat/app";

export function EmployeePage(props) {
  let { user } = props;

  const auth = firebase.auth();

  if (user)
    return (
      <div>
        <p>Welcome to the home page</p>
        <Button onClick={() => auth.signOut()}>Sign out</Button>

        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">
              Welcome <i>{user.name}</i> Good luck! 🥰
            </h1>
            <Container>
              <p>id: {user.id}</p>
              <p>name: {user.name}</p>
              <p>password: {user.password}</p>
              <p>
                <b>time worked:</b> {msToRealTime(user.timeSpent)}
              </p>
              <p>
                <b>time relaxed:</b> {msToRealTime(user.relaxTimeSpent)}
              </p>
              <p>
                <b>time trained:</b> {msToRealTime(user.trainingTimeSpent)}
              </p>
              <p>admin: {JSON.stringify(user.admin)}</p>
            </Container>
          </Container>
        </Container>
      </div>
    );
  else <p>Loading...</p>;
}

export function msToRealTime(ms) {
  const seconds = (ms / 1000) % 60;
  const minutes = (ms / 60000) % 60;
  const hours = (ms / 3600000) % 60;
  return `${Math.floor(hours)}h:${Math.floor(minutes)}m:${Math.floor(
    seconds
  )}s`;
}
