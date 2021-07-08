import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function Navigation({ signedIn }) {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p className="f3 link dim black underline pa3 pointer">
        {signedIn ? (
          <Link to="signout">Sign Out</Link>
        ) : (
          <Link to="signin">Sign In</Link>
        )}
      </p>
    </nav>
  );
}
