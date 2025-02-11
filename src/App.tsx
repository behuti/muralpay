import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateCustomer } from "./pages/create-customer";
import { UserProvider } from "./context/UserProvider";

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<CreateCustomer />} />
          {/* Add other routes as needed */}
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
