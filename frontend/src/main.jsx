import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import theme from "./styles/theme.js";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
