import React from "react";
import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Routing;
