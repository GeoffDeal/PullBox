import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contexts from "./Contexts";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Pulls from "./components/Pulls";
import CustomersPage from "./components/CustomersPage";
import Notifications from "./components/Notifications";
import BookPage from "./components/BookPage";
import CustomerDetails from "./components/CustomerDetails";
import ShopPulls from "./components/ShopPulls";
import BrowsePage from "./components/BrowsePage";
import AdminPage from "./components/AdminPage";

function App() {

  return (
    <Contexts>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="searchpage" element={<SearchPage />} />
            <Route path="pulls" element={<Pulls />} />
            <Route path="shoppulls" element={<ShopPulls />} />
            <Route path="customerspage" element={<CustomersPage />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="bookpage" element={<BookPage />} />
            <Route path="customerdetails" element={<CustomerDetails />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Contexts>
  )
}

export default App
