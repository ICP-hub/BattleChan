import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

type Theme = {
  darkColor: string;
  lightColor: string;
};

function Routing(props: Theme) {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Dashboard darkColor={darkColor} lightColor={lightColor} />}
        />
      </Routes>
    </div>
  );
}

export default Routing;
