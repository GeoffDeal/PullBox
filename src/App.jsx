import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Pulls from "./components/Pulls";
import CustomersPage from "./components/CustomersPage";
import Notifications from "./components/Notifications";
import { UserContext } from "./Contexts";
import { useState } from "react";


function App() {
  const [user, setUser] = useState({
    username: 'Super Hero',
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@emailprovider.com',
    phone: "(709) 555-5555",
    userID: 0,
    userType: 'customer',
    subList: ['Batman', 'Poison Ivy', 'Shazam', 'World Finest'],
});

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="searchpage" element={<SearchPage />} />
            <Route path="pulls" element={<Pulls />} />
            <Route path="customerspage" element={<CustomersPage />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
