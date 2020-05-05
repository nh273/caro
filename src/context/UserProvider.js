import React, { createContext } from "react";
import { auth } from "../components/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {
  state = { user: null };

  componentDidMount = () => {
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  };

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
