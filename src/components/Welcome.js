import React from "react";
import { Link } from "react-router-dom";
import { SignIn } from "./SignIn";
import { OnlineGameForm } from "./GameComponents";
import instruction_unblocked from "../assets/instruction_unblocked.png";
import instruction_blocked from "../assets/instruction_blocked.png";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <SignIn />
        <Link to="/local">
          <button type="button">Start local game</button>
        </Link>
        <OnlineGameForm
          joinOnlineGame={this.props.joinOnlineGame}
          createOnlineGame={this.props.createOnlineGame}
        />
        <div className="how-to-play">
          <p>
            Win the game by putting 3 stones in a row (vertical, horizontal, or
            either diagonals).
          </p>
          <img
            src={instruction_unblocked}
            alt="win with 3 stones in a row"
            style={{ width: "10vw" }}
          />
          <p>
            If your line is blocked at either or both ends by the opponent, you
            will need 4 stones in a row.
          </p>
          <img
            src={instruction_blocked}
            alt="win under block with 4 stones in a row"
            style={{ width: "15vw" }}
          />
        </div>
      </div>
    );
  }
}

export default Welcome;
