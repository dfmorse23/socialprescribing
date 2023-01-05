import React from "react";
import {createRoot} from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./utils/theme";
import { QueryClientProvider, QueryClient } from "react-query";
// import { queryClient } from "./api";
import { AuthProvider } from "./utils/AuthContext";

import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// Importing pages ---------------------
import Home from "./pages/Home";

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (!container) throw new Error("container not found!");

const root = createRoot(container);

root.render(
  // Using React Router Dom for routes to pages and wrapping it with Chakra UI
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
