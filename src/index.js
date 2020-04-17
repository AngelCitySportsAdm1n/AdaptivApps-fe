// Import dependencies
import React from "react";
import ReactDOM from "react-dom";

// Import project configurations from local files
import { Auth0Provider } from "./config/react-auth0-spa";
import config from "./config/auth_config";
// Styling imports
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
// Component imports
import theme from "./theme";
import App from "./App";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // Wrap project in auth0 for authentication and authorization
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    responseType={config.responseType}
    scope={config.scope}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
