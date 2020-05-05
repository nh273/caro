import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import Modal from "react-modal";

import { auth } from "./firebase";
import { UserContext } from "../context/UserProvider";

export function SignIn(props) {
  const user = useContext(UserContext);

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        return false;
      },
    },
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        requireDisplayName: false,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
  };

  if (!user) {
    return (
      <Modal isOpen ariaHideApp={false}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Modal>
    );
  }

  return (
    <div id="signin-widget">
      Welcome, {user.displayName}
      <button onClick={() => auth.signOut()}>Sign out</button>{" "}
    </div>
  );
}
