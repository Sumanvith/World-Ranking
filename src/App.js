import ReactDOM from "react-dom/client";
import React from "react";

const AppLayout = () => {
  return (
    <div className="app">
      <h1>Hi</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
