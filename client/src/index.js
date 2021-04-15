import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

import App from "./Components/App";
import { AuthProvider } from "./providers/AuthContext";

import { ChakraProvider } from "@chakra-ui/react";
console.log(window.location.origin);
axios.defaults.baseURL =
  window.location.origin === "http://localhost:3000"
    ? "http://localhost:5000"
    : window.location.origin;

ReactDOM.render(
  <ChakraProvider>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
