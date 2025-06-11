import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contexts from "./Contexts";
import Account from "./components/Account";
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
import StoreInfo from "./components/StoreInfo";
import SeriesPage from "./components/SeriesPage";
import SignInPage from "./components/SignInPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Contexts>
      <BrowserRouter basename="/">
        <SignedOut>
          <Routes>
            <Route path="*" element={<SignInPage />} />
          </Routes>
        </SignedOut>
        <SignedIn>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="storeinfo" element={<StoreInfo />} />
              <Route path="account" element={<Account />} />
              <Route path="browse" element={<BrowsePage />} />
              <Route path="searchpage" element={<SearchPage />} />
              <Route path="pulls" element={<Pulls />} />
              <Route path="shoppulls" element={<ShopPulls />} />
              <Route path="customerspage" element={<CustomersPage />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="bookpage/:productId" element={<BookPage />} />
              <Route path="customerdetails" element={<CustomerDetails />} />
              <Route path="seriespage" element={<SeriesPage />} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </SignedIn>
      </BrowserRouter>
    </Contexts>
  );
}

export default App;
