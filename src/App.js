import ReactDOM from "react-dom/client";
import React from "react";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <div>
      <Header></Header>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
