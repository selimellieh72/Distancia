import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import App from "./Components/App";
import { AuthProvider } from "./providers/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

axios.defaults.baseURL =
  window.location.origin === "http://localhost:3000"
    ? "http://localhost:5000/api"
    : window.location.origin + "/api";

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
