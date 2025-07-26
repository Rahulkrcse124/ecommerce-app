import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Context/Auth.jsx";
import { SearchProvider } from "./components/Context/Search.jsx";
import { CardProvider } from "./components/Context/Card.jsx";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CardProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CardProvider>
    </SearchProvider>
  </AuthProvider>
);
