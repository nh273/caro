import React from "react";
import { Link } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/local">Start local game</Link>
        </li>
        <li>
          <Link to="/online">Start online game</Link>
        </li>
      </ul>
    );
  }
}

export default Welcome;
