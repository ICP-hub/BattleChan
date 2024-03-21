import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import { persistStore } from "redux-persist";
// let persistor = persistStore(store);
import { AuthProvider } from "./components/StateManagement/useContext/useAuth";
// import store from "./old/Store/Store";
import store, {persistor} from "./components/StateManagement/Redux/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <AuthProvider>
  //     <PersistGate>
  //       <App />
  //     </PersistGate>
  //   </AuthProvider>
  // </Provider>

  <Provider store={store}>
    <AuthProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </AuthProvider>
  </Provider>
);
