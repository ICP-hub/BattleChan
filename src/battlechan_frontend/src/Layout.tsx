import React from "react";
import Navbar from "./components/LandingPage/Navbar/Navbar";

interface LayoutProps {
  handleThemeSwitch: () => void;
  children: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children, handleThemeSwitch }) => {
  return (
    <div>
      <Navbar handleThemeSwitch={handleThemeSwitch} />
      {children} 
    </div>
  );
};

export default Layout;
