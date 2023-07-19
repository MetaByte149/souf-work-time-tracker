import solarPanelBackground from "./assets/solar_panels.jpg";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { MainPage } from "./pages/main_page/main_page";
import { SignInPage } from "./pages/sign_in_page/sign_in_page";
import FirebaseUserProvider from "./repos/user/firebase_user_provider";
import UserRepo from "./repos/user/user_repo";

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
export const userRepo = new UserRepo(new FirebaseUserProvider());

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <div
      className="text-center"
      style={{
        backgroundImage: `url(${solarPanelBackground}) `,
        backgroundSize: "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-attachment": "fixed",
      }}
    >
      <section>
        {authUser ? <MainPage authUser={authUser} /> : <SignInPage />}
      </section>
    </div>
  );
}

export default App;
