import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes";
import "./index.css";

// hohlala test cicd
const App: React.FC = () => {
  const routeElement = useRoutes(routes);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{routeElement}</main>
    </div>
  );
};

export default App;
