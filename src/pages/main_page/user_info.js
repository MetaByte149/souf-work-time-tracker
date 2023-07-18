import { Container } from "react-bootstrap";
import { userRepo } from "../../App";
import { useEffect, useState } from "react";
import User from "../../models/user";

export function UserInfo(props) {
  let { user, liveTimeSpent } = props;


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
}

export function msToRealTime(ms) {
  const seconds = (ms / 1000) % 60;
  const minutes = (ms / 60000) % 60;
  const hours = (ms / 3600000) % 60;
  return `${Math.floor(hours)}h:${Math.floor(minutes)}m:${Math.floor(
    seconds
  )}s`;
}
