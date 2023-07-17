import "./App.css";
import User from "./models/User";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import {
  useCollectionData,
  useCollectionDataOnce,
  useDocument,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBnx-2F4AoRsDT1uAxskpY6g4RUGNa8iz0",
  authDomain: "souf-work-time-tracker.firebaseapp.com",
  projectId: "souf-work-time-tracker",
  storageBucket: "souf-work-time-tracker.appspot.com",
  messagingSenderId: "1031994206693",
  appId: "1:1031994206693:web:d406b48634946c4e83670c",
  measurementId: "G-1LCDRSGV5K",
});

const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
      </header>

      <section>{user ? <MainPage /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <p>Welcome to the sign in page</p>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
}

function MainPage() {
  const signOut = () => auth.signOut();

  return (
    <div>
      <p>Welcome to the home page</p>
      <button onClick={signOut}>Sign out</button>
      <UserInfo />
    </div>
  );
}

function UserInfo() {
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

// function MyComponent() {
//   // const myUserQuery = firestore.collection("users").doc("fAw1lxmRrloDVqN4xS3N");
//   // let myUserData = useCollectionDataOnce(myUserQuery);
//   // console.log(myUserData);
//   // console.log("NEW APP!");

//   return <p>Hello 2</p>;
// }

export default App;
