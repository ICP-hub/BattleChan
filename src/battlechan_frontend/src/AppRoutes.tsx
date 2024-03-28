// AppRoutes.tsx
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './components/Loader/Loader';
import { useConnect } from '@connect2ic/react';

// Lazy load pages
const Landing = React.lazy(() => import('./pages/Landing/Landing'));
const DashboardRoutes = React.lazy(() => import('./pages/Routes'));

interface AppRoutesProps {
    darkColor: string;
    lightColor: string;
    handleThemeSwitch: () => void; // Adjust based on the actual implementation
}

const AppRoutes = ({ darkColor, lightColor, handleThemeSwitch }) => {
    // Replace the useSelector line below with the correct selector based on your state
    //   let isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    //   React.useEffect(() => {
    //     console.log(`Authentication state is now: ${isAuthenticated}`);
    //   }, [isAuthenticated]);
    

    let { isConnected, principal } = useConnect()
    const [allow, setAllow] = useState(false);
    useEffect(() => {
        setAllow(true);
      }, []);
    
    React.useEffect(() => {
        if (principal) {
            console.log('Principalm eff of aepr :', principal);
            // Perform any other actions that depend on the updated principal value
        }
    }, [principal]); 
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loader />}>
                        <Landing darkColor={darkColor} lightColor={lightColor} handleThemeSwitch={handleThemeSwitch} />
                    </Suspense>
                }
            />

            <Route
                path="/dashboard/*"
                element={
                    allow  == true?  (
                        <Suspense fallback={<Loader />}>
                            <DashboardRoutes darkColor={darkColor} lightColor={lightColor} handleThemeSwitch={handleThemeSwitch} />
                        </Suspense>
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />

        </Routes>

    );
};

export default AppRoutes;
