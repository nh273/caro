import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import { auth } from "./firebase";

export function SignIn(props) {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        props.onSignInSuccess(authResult.user);
        return false;
      },
    },
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        requireDisplayName: false,
      },
      { provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID },
    ],
  };

  if (!props.signedIn) {
    return (
      <div id="signin-widget">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }

  return (
    <div id="signin-widget">
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>{" "}
    </div>
  );
}
