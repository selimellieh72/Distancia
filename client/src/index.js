import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./Components/App";
import { AuthProvider } from "./providers/AuthContext";

import { ChakraProvider } from "@chakra-ui/react"

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
