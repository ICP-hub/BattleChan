// import { useState } from 'react';
// import { battlechan_backend } from 'declarations/battlechan_backend';
// import { Route } from 'react-router-dom';
// import {Landing} from "./pages/Landing" ;
// function App() {
//   const [greeting, setGreeting] = useState('');

//   function handleSubmit(event) {
//     event.preventDefault();
//     const name = event.target.elements.name.value;
//     battlechan_backend.greet(name).then((greeting) => {
//       setGreeting(greeting);
//     });
//     return false;
//   }

//   return (
//     <main>
//       {/* <img src="/logo2.svg" alt="DFINITY logo" /> */}
//       {/* <br />
//       <br /> */}
//       {/* <form action="#" onSubmit={handleSubmit}>
//         <label htmlFor="name">Enter your name: &nbsp;</label>
//         <input id="name" alt="Name" type="text" />
//         <button type="submit">Click Me!</button>
//       </form> */}
//       {/* <section id="greeting">{greeting}</section> */}

//       <h1>App.js</h1>

//       <Routes>
//         <Route
//           path='/'
//           element = {}
//         >

//         </Route>
//       </Routes>

//     </main>
//   );
// }

// export default App;


// <-------implement lazy loading _________ --------> 


// import { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Lazy load pages
// const Landing = lazy(() => import("./pages/Landing/Landing"));
// const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"))
// const Loader = lazy(() => import("./components/Loader/Loader"))
// const DashboardRoutes = lazy(() => import("./pages/Routes"))


// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Suspense fallback={<Loader/>}>
//                 <Landing />
//               </Suspense>
//             }
//           />
          
//           <Route
//           path="/dashboard/*"
//           element={
//             <Suspense fallback={<Loader />}>
//               <DashboardRoutes/>
//             </Suspense>
//           }
//         />
         
//         </Routes>
//       </div>
//     </Router>
    
//   );
// }

// export default App;

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load pages
const Landing = lazy(() => import("./pages/Landing/Landing"));
const DashboardRoutes = lazy(() => import("./pages/Routes"));

// Directly import and use Loader component for Suspense fallback
// This assumes you have a Loader component defined in your project.
// If not, you can use a simple inline component or JSX.
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Landing />
              </Suspense>
            }
          />
          
          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardRoutes />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


