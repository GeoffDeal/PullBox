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
import { CustomersContext, NotificationContext, PendingContext, UserContext } from "./Contexts";
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
const [customers, setCustomers] = useState([
  { boxnumber: 1, name: 'John Doe', email: 'email@emailprovider.com', phone: "(709) 555-5555", userID: 0, customer: true, subList: ['Batman', 'Poison Ivy', 'Shazam', 'World Finest',],},
  { boxnumber: 2, name: 'Geoff Deal', email: 'test@email.com', phone: '(709) 555-6666', userID: 2, customer: true, subList: ['Radiant Black', 'Rogue Sun', 'Dead Lucky', 'No/One',],},
  { boxnumber: 3, name: 'James', email: 'james@yipee.com', phone: '(709) 555-7777', userID: 3, customer: true, subList: ['Hulk', 'Wolverine', 'X-Men'],},
  { boxnumber: 4, name: 'Mike Singer', email: 'singer@test.ca', phone: '(709) 555-8888', userID: 4, customer: true, subList: ['W0rldtr33', 'Conan'],},
  { boxnumber: 5, name: 'Clayton Smith', email: 'clay@email.com', phone: '(709) 555-9999', userID: 5, customer: true, subList: ['Looney Tunes', 'Scooby Doo'],},
]);
const [pendingCustomers, setPendingCustomer] = useState([
  { name: 'Mark Smith', email: 'marks@yipee.com', phone: '(709) 555-1111', },
  { name: 'Hal', email: 'HalJ@yipee.com', phone: '(709) 555-2222', },
]);

  return (
    <CustomersContext.Provider value={{ customers, setCustomers }}>
      <PendingContext.Provider value={{ pendingCustomers, setPendingCustomer }}>
        <NotificationContext.Provider value={{ messages, setMessages }}>
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
      </PendingContext.Provider>
    </CustomersContext.Provider>
  )
}

export default App
