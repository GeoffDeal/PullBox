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
import { CustomersContext, NotificationContext, PendingContext, UserContext, PullList } from "./Contexts";
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
const [ pulls, setPulls ] = useState([
  {id: 0, image: 'https://www.universaldist.com/api/v1/images/d2083b1b-30b6-4be1-b06d-56cfc9ef75c0/raw?size=l', cost: 3.99, release: '2024-06-18'},
  {id: 1, image: 'https://www.universaldist.com/api/v1/images/85534557-bd7b-434b-8810-c44ea775a9d9/raw?size=l', cost: 4.99, release: '2024-06-18'},
  {id: 2, image: 'https://www.universaldist.com/api/v1/images/36bc27ba-e3f5-458e-b48d-48f22665fcf9/raw?size=l', cost: 4.99, release: '2024-06-18'},
  {id: 3, image: 'https://www.universaldist.com/api/v1/images/fc12be6e-f4e1-4d1e-ba9f-0305b2e741de/raw?size=l', cost: 3.99, release: '2024-06-25'},
  {id: 4, image: 'https://www.universaldist.com/api/v1/images/185bfe8c-26b3-4198-969d-74d62822ac03/raw?size=l', cost: 5.99, release: '2024-06-25'}
])

  return (
    <PullList.Provider value={{ pulls, setPulls }}>
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
    </PullList.Provider>
  )
}

export default App
