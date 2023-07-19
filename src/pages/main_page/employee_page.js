import { Container, Button, Modal } from "react-bootstrap";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { userRepo } from "../../App";

export function EmployeePage(props) {
  let { user } = props;

  const [timeSpentCurrentSession, setTimeSpentCurrentSession] = useState(0);
  const [currentTimeSpending, setCurrentTimeSpending] = useState(
    TIME_SPENT_ON.WORK
  );

  useEffect(() => {
    let _minuteInterval;
    let _secondInterval;
    if (user) {
      _minuteInterval = setInterval(() => {
        userRepo.updateUser(user);
      }, 60000);

      _secondInterval = setInterval(() => {
        setTimeSpentCurrentSession((t) => t + 1000);
        console.log(currentTimeSpending);
        switch (currentTimeSpending) {
          case TIME_SPENT_ON.WORK:
            user.timeSpent += 1000;
            break;
          case TIME_SPENT_ON.BREAK:
            user.relaxTimeSpent += 1000;
            break;
          case TIME_SPENT_ON.TRAINING:
            user.trainingTimeSpent += 1000;
            break;
          default:
            console.error("You should never see this. ");
            break;
        }
      }, 1000);
    }

    return () => {
      clearInterval(_minuteInterval);
      clearInterval(_secondInterval);
    };
  }, [user, currentTimeSpending]);

  const auth = firebase.auth();

  if (user)
    return (
      <Container>
        <p>Welcome to the home page</p>
        <Button onClick={() => auth.signOut()}>Sign out</Button>

        <Container className=" py-4 mb-4 bg-light rounded-3">
          <h1 className="header">
            Welcome <i>{user.name}</i> Good luck! 🥰
          </h1>
          <b>
            <p>id:</p>
          </b>
          {user.id}

          <b>
            <p>name:</p>{" "}
          </b>
          {user.name}
          <b>
            <p>password:</p>{" "}
          </b>
          {user.password}
          <p>
            <b>time worked:</b> {msToRealTime(user.timeSpent)}
          </p>
          <p>
            <b>time relaxed:</b> {msToRealTime(user.relaxTimeSpent)}
          </p>
          <p>
            <b>time trained:</b> {msToRealTime(user.trainingTimeSpent)}
          </p>
          <b>
            <p>admin: {JSON.stringify(user.admin)}</p>
          </b>
          <p>
            <b>Time spent current session:</b>{" "}
            {msToRealTime(timeSpentCurrentSession)}
          </p>
        </Container>
        <Button onClick={() => setCurrentTimeSpending(TIME_SPENT_ON.BREAK)}>
          Pause
        </Button>
        <Button onClick={() => setCurrentTimeSpending(TIME_SPENT_ON.TRAINING)}>
          Training
        </Button>

        <Popup
          currentTimeSpending={currentTimeSpending}
          setCurrentTimeSpending={setCurrentTimeSpending}
        />
      </Container>
    );
  else <p>Loading...</p>;
}

export function Popup(props) {
  const { currentTimeSpending, setCurrentTimeSpending } = props;

  let titleText;
  let bodyText;

  switch (currentTimeSpending) {
    case TIME_SPENT_ON.BREAK:
      titleText = "Break time 🍦";
      bodyText = "You are currently on break";
      break;

    case TIME_SPENT_ON.TRAINING:
      titleText = "Training time! 🏋️‍♂️";
      bodyText = "You are currently on training";
      break;

    default:
      titleText = "Bye 🙋‍♂️";
      bodyText = "Bye 🙋";
  }

  const closePopup = () => {
    setCurrentTimeSpending(TIME_SPENT_ON.WORK);
  };

  return (
    <Modal
      show={currentTimeSpending !== TIME_SPENT_ON.WORK}
      onHide={closePopup}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{titleText}</Modal.Title>
      </Modal.Header>
      <Modal.Body> {bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closePopup}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function msToRealTime(ms) {
  const seconds = (ms / 1000) % 60;
  const minutes = (ms / 60000) % 60;
  const hours = (ms / 3600000) % 60;
  return `${Math.floor(hours)}h:${Math.floor(minutes)}m:${Math.floor(
    seconds
  )}s`;
}

export const TIME_SPENT_ON = {
  WORK: "WORK",
  BREAK: "BREAK",
  TRAINING: "TRAINING",
};
