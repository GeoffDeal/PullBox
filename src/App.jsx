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


function App() {
  return (
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
  )
}

export default App
