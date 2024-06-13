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
import { NotificationContext, UserContext } from "./Contexts";
import { useState } from "react";


function App() {
  const [user, setUser] = useState({
    username: 'Super Hero',
    name: 'John Doe',
    email: 'email@emailprovider.com',
    phone: "(709) 555-5555",
    userID: 0,
    customer: true,
    subList: ['Batman', 'Poison Ivy', 'Shazam', 'World Finest'],
});
const [messages, setMessages] = useState([
  {title: 'Flash Sale', date: 'June 8th, 2024', body: 'All back issues are 50% for the weekend!'},
  {title: 'Free Comic Book Day', date: 'May 2nd, 2024', body: 'Free Comic Book Day is this Saturday! Great sales storewide!'},
  {title: 'Another Test', date: 'April 21st, 2024', body: 'This is going to be a really long text to test what it looks like when a longer message is posted. Lorem etc etc, should really use a lorem generator but I am invested now'},
  {title: 'Test Post', date: 'April 20th, 2024', body: 'Testing, testing, 1, 2, 3'}
]);

  return (
    <NotificationContext.Provider value={{messages, setMessages}}>
      <UserContext.Provider value={{ user, setUser }}>
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
    </NotificationContext.Provider>
  )
}

export default App
