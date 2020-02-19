import React from "react";
import { Link } from "react-router-dom";

// Auth0 imports
import { useAuth0 } from "./auth/react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {/* If a user is not logged in (authenticated), will redirect to Auth0 log in modal. */}
      {!isAuthenticated && (
        <button aria-label="Access log in modal" onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {/* If a user is logged in (authenticated), log out button will show & functionality will be enabled.) */}
      {isAuthenticated && <button aria-label="log out" onClick={() => logout()}>Log out</button>}

      <Link to="/">Home</Link>
      {isAuthenticated && (
        <>
          <Link to="/dashboard">Profile</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;