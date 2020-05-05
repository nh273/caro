import React from "react";
import { Link } from "react-router-dom";
import { OnlineGameForm } from "./GameComponents";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <Link to="/local">Start local game</Link>
        <OnlineGameForm
          joinOnlineGame={this.props.joinOnlineGame}
          createOnlineGame={this.props.createOnlineGame}
        />
        {this.props.signInUI}
      </div>
    );
  }
}

export default Welcome;
