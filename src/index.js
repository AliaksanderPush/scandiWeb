import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";
import client from "./apollo";
import { Spinner } from "./components";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ErrorBoundry>
        <Router>
          <App />
        </Router>
      </ErrorBoundry>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
