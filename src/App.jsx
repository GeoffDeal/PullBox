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
import { CustomersContext, NotificationContext, PendingContext, UserContext, PullList, ComicList } from "./Contexts";
import { useState } from "react";
import BookPage from "./components/BookPage";
import CustomerDetails from "./components/CustomerDetails";


function App() {
  const [user, setUser] = useState({
    boxNumber: 1,
    name: 'John Doe',
    email: 'email@emailprovider.com',
    phone: "(709) 555-5555",
    customer: true,
    subList: ['Batman', 'Poison Ivy', 'Shazam', 'World Finest'],
    userID: 0,
});
const [messages, setMessages] = useState([
  {title: 'Flash Sale', date: 'June 8th, 2024', body: 'All back issues are 50% for the weekend!'},
  {title: 'Free Comic Book Day', date: 'May 2nd, 2024', body: 'Free Comic Book Day is this Saturday! Great sales storewide!'},
  {title: 'Another Test', date: 'April 21st, 2024', body: 'This is going to be a really long text to test what it looks like when a longer message is posted. Lorem etc etc, should really use a lorem generator but I am invested now'},
  {title: 'Test Post', date: 'April 20th, 2024', body: 'Testing, testing, 1, 2, 3'}
]);
const [customers, setCustomers] = useState([
  { boxNumber: 1, name: 'John Doe', email: 'email@emailprovider.com', phone: "(709) 555-5555", userID: 0, customer: true, subList: ['Batman', 'Poison Ivy', 'Shazam', 'World Finest',],},
  { boxNumber: 2, name: 'Geoff Deal', email: 'test@email.com', phone: '(709) 555-6666', userID: 2, customer: true, subList: ['Radiant Black', 'Rogue Sun', 'Dead Lucky', 'No/One',],},
  { boxNumber: 3, name: 'James', email: 'james@yipee.com', phone: '(709) 555-7777', userID: 3, customer: true, subList: ['Hulk', 'Wolverine', 'X-Men'],},
  { boxNumber: 4, name: 'Mike Singer', email: 'singer@test.ca', phone: '(709) 555-8888', userID: 4, customer: true, subList: ['W0rldtr33', 'Conan'],},
  { boxNumber: 5, name: 'Clayton Smith', email: 'clay@email.com', phone: '(709) 555-9999', userID: 5, customer: true, subList: ['Looney Tunes', 'Scooby Doo'],},
]);
const [pendingCustomers, setPendingCustomer] = useState([
  { name: 'Mark Smith', email: 'marks@yipee.com', phone: '(709) 555-1111', },
  { name: 'Hal', email: 'HalJ@yipee.com', phone: '(709) 555-2222', },
]);
const [ pulls, setPulls ] = useState([
  {
    ProductName: "GREEN ARROW #14 LOPEZ",
    Category: "COMICS",
    ItemCode: "DC04240096",
    Sku: "76194138013101441",
    MSRP: "$4.99",
    Release: "2024-06-23",
    FOCDueDate: "2024-06-30",
    ImageURL: "https://www.universaldist.com/api/v1/images/0456573b-e32d-41ea-ad5c-83e3d91113e7/raw?size=l"
    },
    {
    ProductName: "ZATANNA: BRING DOWN THE HOUSE #2 DIAZ",
    Category: "COMICS",
    ItemCode: "DC04240175",
    Sku: "76194138125100231",
    MSRP: "$5.99",
    Release: "2024-06-30",
    FOCDueDate: "2024-06-18",
    ImageURL: "https://www.universaldist.com/api/v1/images/083244e7-ba42-400d-a818-855df6c8f7e5/raw?size=l"
    },
    {
    ProductName: "BATMAN: GARGOYLE OF GOTHAM #3 1:50\n1:50 Qualifying Variant",
    Category: "1:50",
    ItemCode: "DC02240030",
    Sku: "76194137147400361",
    MSRP: "$6.99",
    Release: "2024-06-23",
    FOCDueDate: "2024-06-23",
    ImageURL: "https://www.universaldist.com/api/v1/images/9b174744-024c-4c7d-9645-0a1b9ad67d05/raw?size=l"
    }
])
const [ comics, setComics ] = useState([
  {
  ProductName: "GREEN ARROW #14 LOPEZ",
  Category: "COMICS",
  ItemCode: "DC04240096",
  Sku: "76194138013101441",
  MSRP: "$4.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/0456573b-e32d-41ea-ad5c-83e3d91113e7/raw?size=l"
  },
  {
  ProductName: "ZATANNA: BRING DOWN THE HOUSE #2 DIAZ",
  Category: "COMICS",
  ItemCode: "DC04240175",
  Sku: "76194138125100231",
  MSRP: "$5.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/083244e7-ba42-400d-a818-855df6c8f7e5/raw?size=l"
  },
  {
  ProductName: "BATMAN: GARGOYLE OF GOTHAM #3 1:50\n1:50 Qualifying Variant",
  Category: "1:50",
  ItemCode: "DC02240030",
  Sku: "76194137147400361",
  MSRP: "$6.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-23",
  ImageURL: "https://www.universaldist.com/api/v1/images/9b174744-024c-4c7d-9645-0a1b9ad67d05/raw?size=l"
  },
  {
  ProductName: "HARLEY QUINN #42 LEIRIX",
  Category: "COMICS",
  ItemCode: "DC04240105",
  Sku: "76194137281504221",
  MSRP: "$5.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/631dd4ec-6d04-4df1-8e2e-e42d35e51ece/raw?size=l"
  },
  {
  ProductName: "THE NICE HOUSE BY THE SEA #1",
  Category: "COMICS",
  ItemCode: "DC04240159",
  Sku: "76194138051300111",
  MSRP: "$4.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/ea636568-3f07-4036-8770-9802015d00fa/raw?size=l"
  },
  {
  ProductName: "BATMAN: DARK AGE #4",
  Category: "COMICS",
  ItemCode: "DC04240055",
  Sku: "76194138244900411",
  MSRP: "$5.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/f7771a4d-0428-401d-9152-811365aa81dd/raw?size=l"
  },
  {
  ProductName: "THE FLASH #11",
  Category: "COMICS",
  ItemCode: "DC04240155",
  Sku: "76194138164001111",
  MSRP: "$3.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/2d2abc55-803d-4bb0-a6c5-b27ff4e20462/raw?size=l"
  },
  {
  ProductName: "AP: ORIGINS #1",
  Category: "COMICS",
  ItemCode: "DC04240014",
  Sku: "76194138550100111",
  MSRP: "$3.99",
  Release: "2024-07-23",
  FOCDueDate: "2024-06-30",
  ImageURL: "https://www.universaldist.com/api/v1/images/730af668-11e8-4abe-b30d-938fa80eb006/raw?size=l"
  }
]);

  return (
  <ComicList.Provider value={{ comics, setComics }}>
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
                    <Route path="bookpage" element={<BookPage />} />
                    <Route path="customerdetails" element={<CustomerDetails />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </UserContext.Provider>
          </NotificationContext.Provider>
        </PendingContext.Provider>
      </CustomersContext.Provider>
    </PullList.Provider>
  </ComicList.Provider>
  )
}

export default App
