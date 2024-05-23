import React from "react";
import Navbar from "./components/Dashboard/Navbar/Navbar";
import NavbarLanding from "./components/LandingPage/Navbar/Navbar";
import { useLocation } from "react-router-dom";


interface LayoutProps {
  handleThemeSwitch: () => void;
  children: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children, handleThemeSwitch }) => {
  const location = useLocation();

  return (
    <div>
 {location.pathname === "/" ? (
        <NavbarLanding handleThemeSwitch={handleThemeSwitch} />
      ) : (
        <Navbar handleThemeSwitch={handleThemeSwitch} />
      )}      {children} 
    </div>
  );
};

export default Layout;
