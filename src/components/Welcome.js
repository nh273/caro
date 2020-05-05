import React from "react";
import { Link } from "react-router-dom";
import { SignIn } from "./SignIn";
import { OnlineGameForm } from "./GameComponents";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <SignIn />
        <Link to="/local">Start local game</Link>
        <OnlineGameForm
          joinOnlineGame={this.props.joinOnlineGame}
          createOnlineGame={this.props.createOnlineGame}
        />
      </div>
    );
  }
}

export default Welcome;
