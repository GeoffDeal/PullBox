import { createContext, useState } from "react";

export const UserContext = createContext();
export const NotificationContext = createContext();
export const CustomersContext = createContext();
export const PullList = createContext();
export const ComicList = createContext();
export const StoreInformation = createContext();
export const TaxRates = createContext();
export const ConversionRate = createContext();
export const SeriesContext = createContext();

const Contexts = ({children}) => {
    const [user, setUser] = useState({
        boxNumber: 1,
        name: 'John Doe',
        email: 'email@emailprovider.com',
        phone: "(709) 555-5555",
        customer: true,
        subList: [{
          "skus": ["709853039754"],
          "name": "Cowl 1964",
          "publisher": "Image"
        },
        {
          "skus": ["709853033141"],
          "name": "Rogue Sun",
          "publisher": "Image"
        }],
        userID: 0,
        customerType: 'active',
        pulls: [{
          "ProductName": "FALLING IN LOVE ON THE PATH TO HELL #3 CVR B 1:15 MIKE HAWTHORNE VAR\n1:15 Qualifying Variant",
          "Category": "Q.VARIANTS",
          "ItemCode": "0624IM293",
          "Sku": "70985303979200321",
          "MSRP": "$3.99",
          "Release": "2024-08-21",
          "FOCDueDate": "2024-07-22",
          "Qty.Ord.OnTime": 1,
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/297585dd-d83f-4edf-af80-4ce1e526d793/raw?size=l",
          "Publisher": "Image",
        },],
    });
    
    const [customers, setCustomers] = useState([
      { boxNumber: 1, name: 'John Doe', email: 'email@emailprovider.com', phone: "(709) 555-5555", userID: 0, customer: true, customerType: 'active', subList: ['Batman', 'Poison Ivy', 'Shazam', 'Worlds Finest',], pulls: [{
        "ProductName": "KAYA #20 CVR B MAHMUD ASRAR VAR",
        "Category": "COMICS",
        "ItemCode": "0624IM804",
        "Sku": "70985303591602021",
        "MSRP": "$3.99",
        "Release": "2024-08-28",
        "FOCDueDate": "2024-07-15",
        "Qty.Ord.OnTime": 1,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/a6b46917-3be3-46a7-8c7d-37803d763494/raw?size=l",
        "Publisher": "Image",
        "Customer": { name: "John Doe", pullDate: '15/05/2024'}
      }],},
      { boxNumber: 2, name: 'Geoff Deal', email: 'test@email.com', phone: '(709) 555-6666', userID: 2, customer: true, customerType: 'active', subList: ['Radiant Black', 'Rogue Sun', 'Dead Lucky', 'No/One',], pulls: [{
        "ProductName": "KAYA #20 CVR B MAHMUD ASRAR VAR",
        "Category": "COMICS",
        "ItemCode": "0624IM804",
        "Sku": "70985303591602021",
        "MSRP": "$3.99",
        "Release": "2024-08-28",
        "FOCDueDate": "2024-07-15",
        "Qty.Ord.OnTime": 1,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/a6b46917-3be3-46a7-8c7d-37803d763494/raw?size=l",
        "Publisher": "Image",
        "Customer": { name: "Geoff Deal", pullDate: '14/05/2024'}

      },
      {
        "ProductName": "NAPALM LULLABY #6 CVR A BENGAL",
        "Category": "COMICS",
        "ItemCode": "0624IM322",
        "Sku": "70985303952500611",
        "MSRP": "$3.99",
        "Release": "2024-08-14",
        "FOCDueDate": "2024-07-22",
        "Qty.Ord.OnTime": 1,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/6b18a9cb-7b6d-453d-91b6-78a1568ead2a/raw?size=l",
        "Publisher": "Image",
        "Customer": { name: "Geoff Deal", pullDate: '17/05/2024'}

      },

      {
        "ProductName": "ABSOLUTE POWER: SUPER SON #1",
        "Category": "COMICS",
        "ItemCode": "DC06240013",
        "Sku": "76194138621800111",
        "MSRP": "$5.99",
        "Release": "2024-09-18",
        "FOCDueDate": "2024-08-26",
        "Qty.Ord.OnTime": 1,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/f49daf2e-9ee6-4ec0-81c0-8b75eb559c3e/raw?size=l",
        "Issue": "1",
        "Publisher": "Dc",
        "ProductType": "Comic",
        "Customer": { name: "Geoff Deal", pullDate: '17/05/2024'}
      },
      {
        "ProductName": "BLADE: RED BAND #1 KEN LASHLEY RED FOIL VARIANT [POLYBAGGED]",
        "Category": "CB",
        "ItemCode": "MRVL06240044",
        "Sku": "75960620929300121",
        "MSRP": "$6.25",
        "Release": "2024-10-09",
        "FOCDueDate": "2024-08-26",
        "Qty.Ord.OnTime": 1,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/d9c5ae38-afc4-4a94-a92d-32f20ecb2a04/raw?size=l",
        "Issue": "1",
        "Publisher": "Marvel",
        "ProductType": "Comic",
        "Customer": { name: "Geoff Deal", pullDate: '17/05/2024'}

      }
    ],},
      { boxNumber: 3, name: 'James', email: 'james@yipee.com', phone: '(709) 555-7777', userID: 3, customer: true, customerType: 'active', subList: ['Hulk', 'Wolverine', 'X-Men'], pulls: [{
        "ProductName": "GEIGER #5 (2024) CVR A GARY FRANK & BRAD ANDERSON",
        "Category": "COMICS",
        "ItemCode": "0624IM300",
        "Sku": "70985303965500511",
        "MSRP": "$3.99",
        "Release": "2024-08-14",
        "FOCDueDate": "2024-07-22",
        "Qty.Ord.OnTime": 2,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/27b94edf-b472-44f8-9bb3-c0475b3a002b/raw?size=l",
        "Publisher": "Image",
        "Customer": { name: "James", pullDate: '16/05/2024'}

      }],},
      { boxNumber: 4, name: 'Mike Singer', email: 'singer@test.ca', phone: '(709) 555-8888', userID: 4, customer: true, customerType: 'active', subList: ['W0rldtr33', 'Conan'], pulls: [{
        "ProductName": "FALLING IN LOVE ON THE PATH TO HELL #3 CVR B 1:15 MIKE HAWTHORNE VAR\n1:15 Qualifying Variant",
        "Category": "Q.VARIANTS",
        "ItemCode": "0624IM293",
        "Sku": "70985303979200321",
        "MSRP": "$3.99",
        "Release": "2024-08-21",
        "FOCDueDate": "2024-07-22",
        "Qty.Ord.OnTime": 1,
        "Qty.Ord.Late": "",
        "ImageURL": "https://www.universaldist.com/api/v1/images/297585dd-d83f-4edf-af80-4ce1e526d793/raw?size=l",
        "Publisher": "Image",
        "Customer": { name: "Mike Singer", pullDate: '15/05/2024'}

      }],},
      { boxNumber: 5, name: 'Clayton Smith', email: 'clay@email.com', phone: '(709) 555-9999', userID: 5, customer: true, customerType: 'active', subList: ['Looney Tunes', 'Scooby Doo'], pulls: [],},
      { boxNumber: '', name: 'Clark Kent', email: 'supes@yipee.com', phone: '(709) 555-5544', userID: 1, customer: true, customerType: 'inactive', subList: ['X-Men', 'Avengers',], pulls: [],},
      { boxNumber: '', name: 'Jordan Banner', email: 'greyhulk@emailprovider.com', phone: '(709) 555-5566', userID: 6, customer: true, customerType: 'inactive', subList: ['Scarlet Witch'], pulls: [],},
      { boxNumber: '', name: 'Mark Smith', email: 'marks@yipee.com', phone: '(709) 555-1111', userID: 7, customer: true, customerType: 'pending', subList: [], pulls: [],},
      { boxNumber: '', name: 'Hal', email: 'HalJ@yipee.com', phone: '(709) 555-2222', userID: 9, customer: true, customerType: 'pending', subList: [], pulls: [],},
    ]);
    
    const [messages, setMessages] = useState([
      {title: 'Flash Sale', date: 'June 8th, 2024', body: 'All back issues are 50% for the weekend!', id: 10001},
      {title: 'Free Comic Book Day', date: 'May 2nd, 2024', body: 'Free Comic Book Day is this Saturday! Great sales storewide!', id: 10002},
      {title: 'Another Test', date: 'April 21st, 2024', body: 'This is going to be a really long text to test what it looks like when a longer message is posted. Lorem etc etc, should really use a lorem generator but I am invested now', id: 10003},
      {title: 'Test Post', date: 'April 20th, 2024', body: 'Testing, testing, 1, 2, 3', id: 10004}
    ]);
        
    const [ comics, setComics ] = useState([]);

    const [ storeInfo, setStoreInfo] = useState({
      address: '123 Topsail Rd, Mt. Pearl',
      hours: {
        sundayopen:'12',
        sundayclose:'4',
        mondayopen:'',
        mondayclose:'',
        tuesdayopen:'',
        tuesdayclose:'',
        wednesdayopen:'',
        wednesdayclose:'',
        thursdayopen:'',
        thursdayclose:'',
        fridayopen:'',
        fridayclose:'',
        saturdayopen:'',
        saturdayclose:'',
      },
      phone: '(709) 555-5542',
    })
    const [ taxRates, setTaxRates ] = useState({});
    const [ conversion, setConversion ] = useState(1);
    const [ series, setSeries ] = useState([]);
    
    return (
      <SeriesContext.Provider value={{ series, setSeries }}>
        <ConversionRate.Provider value={{ conversion, setConversion}}>
          <TaxRates.Provider value={{ taxRates, setTaxRates }}>
            <StoreInformation.Provider value={{ storeInfo, setStoreInfo }}>
              <ComicList.Provider value={{ comics, setComics }}>
                <CustomersContext.Provider value={{ customers, setCustomers }}>
                    <NotificationContext.Provider value={{ messages, setMessages }}>
                      <UserContext.Provider value={{ user, setUser }}>
                          { children }
                      </UserContext.Provider>
                    </NotificationContext.Provider>
                </CustomersContext.Provider>
              </ComicList.Provider>
            </StoreInformation.Provider>
          </TaxRates.Provider>
        </ConversionRate.Provider>
      </SeriesContext.Provider>
    )
}

export default Contexts;