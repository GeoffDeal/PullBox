import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.less";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{ baseTheme: dark }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
