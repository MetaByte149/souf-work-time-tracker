import solarPanelBackground from "./assets/solar_panels.jpg";


import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignInPage } from "./pages/SignInPage";
import { MainPage } from "./pages/MainPage";

firebase.initializeApp({
  apiKey: "AIzaSyBnx-2F4AoRsDT1uAxskpY6g4RUGNa8iz0",
  authDomain: "souf-work-time-tracker.firebaseapp.com",
  projectId: "souf-work-time-tracker",
  storageBucket: "souf-work-time-tracker.appspot.com",
  messagingSenderId: "1031994206693",
  appId: "1:1031994206693:web:d406b48634946c4e83670c",
  measurementId: "G-1LCDRSGV5K",
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div
      className="text-center"
      style={{
        backgroundImage: `url(${solarPanelBackground}) `,
        "background-size": "cover",
      }}
    >
      <section>{user ? <MainPage /> : <SignInPage />}</section>
    </div>
  );
}

export default App;
