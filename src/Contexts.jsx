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
          },{
          "ProductName": "RADIANT BLACK #30 ",
          "Category": "COMICS",
          "ItemCode": "1223IM315",
          "Sku": "70985303068303011",
          "MSRP": "$3.99",
          "Release": "2024-09-18",
          "FOCDueDate": "2024-08-26",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/ac1d0631-fabd-4163-a8f1-94391f0f33b1/raw?size=l",
          "Issue": "30",
          "Publisher": "Image",
          "ProductType": "Comic",
          "SeriesSku": "709853030683",
          "IssueSku": "709853030683030",
          "Variant": "1",
          "Printing": "1"
        },{
          "ProductName": "RADIANT BLACK #30.5",
          "Category": "COMICS",
          "ItemCode": "1223IM316",
          "Sku": "70985303924203011",
          "MSRP": "$3.99",
          "Release": "2024-09-18",
          "FOCDueDate": "2024-08-26",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/f8267c42-3c85-464b-9ba8-ba2d599b520b/raw?size=l",
          "Issue": "30",
          "Publisher": "Image",
          "ProductType": "Comic",
          "SeriesSku": "709853039242",
          "IssueSku": "709853039242030",
          "Variant": "1",
          "Printing": "1"
        },{
          "ProductName": "SPIDER-GWEN: THE GHOST-SPIDER #3 MARK BROOKS 2ND PRINTING VARIANT [DPWX]",
          "Category": "CB",
          "ItemCode": "MRVL06241015",
          "Sku": "75960620908800312",
          "MSRP": "$3.99",
          "Release": "2024-09-18",
          "FOCDueDate": "2024-08-19",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/bb628168-c200-432e-b803-2ebbd43390e1/raw?size=l",
          "Issue": "3",
          "Publisher": "Marvel",
          "ProductType": "Comic",
          "SeriesSku": "759606209088",
          "IssueSku": "759606209088003",
          "Variant": "1",
          "Printing": "2"
        },{
          "ProductName": "COWL 1964 #2 (OF 3) CVR A ROD REIS",
          "Category": "COMICS",
          "ItemCode": "0724IM328",
          "Sku": "70985303975400211",
          "MSRP": "$3.99",
          "Release": "2024-09-18",
          "FOCDueDate": "2024-08-26",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/1f849cda-eab7-4086-9e47-fec2398c705e/raw?size=l",
          "Issue": "2",
          "Publisher": "Image",
          "ProductType": "Comic",
          "SeriesSku": "709853039754",
          "IssueSku": "709853039754002",
          "Variant": "1",
          "Printing": "1"
        },{
          "ProductName": "SPAWN #357 CVR A MARCIAL TOLEDANO VARGAS",
          "Category": "COMICS",
          "ItemCode": "0624IM355",
          "Sku": "70985300214735711",
          "MSRP": "$2.99",
          "Release": "2024-09-25",
          "FOCDueDate": "2024-09-02",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/97fdb484-4915-4e57-8a9b-3eb9ce7c772f/raw?size=l",
          "Issue": "357",
          "Publisher": "Image",
          "ProductType": "Comic",
          "SeriesSku": "709853002147",
          "IssueSku": "709853002147357",
          "Variant": "1",
          "Printing": "1"
        },{
          "ProductName": "TMNT: SATURDAY MORNING ADVENTURES #17 CVR A",
          "Sort": "CB",
          "ItemCode": "IDW06240042",
          "Sku": "82771403150801711",
          "MSRP": "$3.99",
          "Release": "2024-09-25",
          "FOCDueDate": "2024-08-19",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/a3df2d32-38b7-433c-bc65-66c2665a62d0/raw?size=l",
          "Issue": "17",
          "Publisher": "Idw",
          "ProductType": "Comic",
          "SeriesSku": "827714031508",
          "IssueSku": "827714031508017",
          "Variant": "1",
          "Printing": "1"
        },],
    });
    
    const [customers, setCustomers] = useState([
      {
      	boxNumber: 1,
      	name: 'John Doe',
      	email: 'email@emailprovider.com',
      	phone: "(709) 555-5555",
      	userID: 0,
      	customer: true,
      	customerType: 'active',
      	subList: [{
          "skus": [
            "827714033151",
            "827714033359",
            "827714033168"
          ],
          "name": "Teenage Mutant Ninja Turtles (2024)",
          "publisher": "Idw"
        },
        {
          "skus": ["709853033141"],
          "name": "Rogue Sun",
          "publisher": "Image"
        }],
      	pulls: [{
      		"ProductName": "GHOST RIDER: ROBBIE REYES SPECIAL #1 GONZO VARIANT",
      		"Category": "CB",
      		"ItemCode": "MRVL07240091",
      		"Sku": "75960621011400131",
      		"MSRP": "$4.99",
      		"Release": "2024-10-02",
      		"FOCDueDate": "2024-09-02",
      		"Qty.Ord.OnTime": 2,
      		"Qty.Ord.Late": "",
      		"ImageURL": "https://www.universaldist.com/api/v1/images/74675ca3-7282-46e5-aafa-692e760d2467/raw?size=l",
      		"Issue": "1",
      		"Publisher": "Marvel",
      		"ProductType": "Comic",
      		"SeriesSku": "759606210114",
      		"IssueSku": "759606210114001",
      		"Variant": "3",
      		"Printing": "1",
      		"Customer": {
            boxNumber: 1,
      			name: "John Doe",
      			pullDate: '15/05/2024'
      		}
      	},{
          "ProductName": "COWL 1964 #2 (OF 3) CVR A ROD REIS",
          "Category": "COMICS",
          "ItemCode": "0724IM328",
          "Sku": "70985303975400211",
          "MSRP": "$3.99",
          "Release": "2024-09-18",
          "FOCDueDate": "2024-08-26",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/1f849cda-eab7-4086-9e47-fec2398c705e/raw?size=l",
          "Issue": "2",
          "Publisher": "Image",
          "ProductType": "Comic",
          "SeriesSku": "709853039754",
          "IssueSku": "709853039754002",
          "Variant": "1",
          "Printing": "1",
          "Customer": {
            boxNumber: 1,
      			name: "John Doe",
      			pullDate: '15/05/2024'
      		}
        },{
          "ProductName": "GREEN LANTERN CIVIL CORPS SPECIAL #1",
          "Category": "COMICS",
          "ItemCode": "DC07240151",
          "Sku": "76194138326200111",
          "MSRP": "$5.99",
          "Release": "2024-10-09",
          "FOCDueDate": "2024-09-16",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/9139dc5b-11fa-42c3-b2eb-24f0bbdd7734/raw?size=l",
          "Issue": "1",
          "Publisher": "Dc",
          "ProductType": "Comic",
          "SeriesSku": "761941383262",
          "IssueSku": "761941383262001",
          "Variant": "1",
          "Printing": "1",
          "Customer": {
            boxNumber: 1,
      			name: "John Doe",
      			pullDate: '15/05/2024'
      		}
        },{
          "ProductName": "CRYPT OF SHADOWS #1",
          "Category": "CB",
          "ItemCode": "MRVL07240047",
          "Sku": "75960621028200111",
          "MSRP": "$4.99",
          "Release": "2024-10-16",
          "FOCDueDate": "2024-09-16",
          "Qty.Ord.OnTime": "",
          "Qty.Ord.Late": "",
          "ImageURL": "https://www.universaldist.com/api/v1/images/f82a4c6e-c50a-4a57-8aa0-7574ae1507c7/raw?size=l",
          "Issue": "1",
          "Publisher": "Marvel",
          "ProductType": "Comic",
          "SeriesSku": "759606210282",
          "IssueSku": "759606210282001",
          "Variant": "1",
          "Printing": "1",
          "Customer": {
            boxNumber: 1,
      			name: "John Doe",
      			pullDate: '15/05/2024'
      		}
        }],
      }, {
      	boxNumber: 2,
      	name: 'Geoff Deal',
      	email: 'test@email.com',
      	phone: '(709) 555-6666',
      	userID: 2,
      	customer: true,
      	customerType: 'active',
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
      	pulls: [{
      			"ProductName": "WOLVERINE: DEEP CUT #4",
      			"Category": "CB",
      			"ItemCode": "MRVL07240319",
      			"Sku": "75960620994100411",
      			"MSRP": "$3.99",
      			"Release": "2024-10-02",
      			"FOCDueDate": "2024-09-02",
      			"Qty.Ord.OnTime": 1,
      			"Qty.Ord.Late": "",
      			"ImageURL": "https://www.universaldist.com/api/v1/images/c4320781-2c8d-4e5f-ab83-83fd0bbb7bef/raw?size=l",
      			"Issue": "4",
      			"Publisher": "Marvel",
      			"ProductType": "Comic",
      			"SeriesSku": "759606209941",
      			"IssueSku": "759606209941004",
      			"Variant": "1",
      			"Printing": "1",
      			"Customer": {
              boxNumber: 2,
      				name: "Geoff Deal",
      				pullDate: '14/05/2024'
      			}

      		},
      		{
      			"ProductName": "SPIDER-GWEN: THE GHOST-SPIDER #6",
      			"Category": "CB",
      			"ItemCode": "MRVL07240202",
      			"Sku": "75960620908800611",
      			"MSRP": "$3.99",
      			"Release": "2024-10-02",
      			"FOCDueDate": "2024-09-02",
      			"Qty.Ord.OnTime": 1,
      			"Qty.Ord.Late": "",
      			"ImageURL": "https://www.universaldist.com/api/v1/images/befcf02b-e36f-47d2-a5d7-ba05b9e35260/raw?size=l",
      			"Issue": "6",
      			"Publisher": "Marvel",
      			"ProductType": "Comic",
      			"SeriesSku": "759606209088",
      			"IssueSku": "759606209088006",
      			"Variant": "1",
      			"Printing": "1",
      			"Customer": {
              boxNumber: 2,
      				name: "Geoff Deal",
      				pullDate: '17/05/2024'
      			}

      		},

      		{
      			"ProductName": "STAR WARS: EWOKS #1 DAVID LOPEZ VARIANT",
      			"Category": "CB",
      			"ItemCode": "MRVL07240241",
      			"Sku": "75960620811100121",
      			"MSRP": "$3.99",
      			"Release": "2024-10-09",
      			"FOCDueDate": "2024-09-09",
      			"Qty.Ord.OnTime": 1,
      			"Qty.Ord.Late": "",
      			"ImageURL": "https://www.universaldist.com/api/v1/images/647d3bc4-7e3c-4ac2-9800-df5878476b12/raw?size=l",
      			"Issue": "1",
      			"Publisher": "Marvel",
      			"ProductType": "Comic",
      			"SeriesSku": "759606208111",
      			"IssueSku": "759606208111001",
      			"Variant": "2",
      			"Printing": "1",
      			"Customer": {
              boxNumber: 2,
      				name: "Geoff Deal",
      				pullDate: '17/05/2024'
      			}
      		},{
            "ProductName": "ZATANNA: BRING DOWN THE HOUSE #4",
            "Category": "COMICS",
            "ItemCode": "DC06240206",
            "Sku": "76194138125100411",
            "MSRP": "$5.99",
            "Release": "2024-09-25",
            "FOCDueDate": "2024-09-02",
            "Qty.Ord.OnTime": "",
            "Qty.Ord.Late": "",
            "ImageURL": "https://www.universaldist.com/api/v1/images/ec2c8919-3cf4-4ca4-823b-bd0c7257f115/raw?size=l",
            "Issue": "4",
            "Publisher": "Dc",
            "ProductType": "Comic",
            "SeriesSku": "761941381251",
            "IssueSku": "761941381251004",
            "Variant": "1",
            "Printing": "1",
            "Customer": {
              boxNumber: 2,
      				name: "Geoff Deal",
      				pullDate: '17/05/2024'
      			}
          },{
            "ProductName": "DAZZLER #2",
            "Category": "CB",
            "ItemCode": "MRVL07240057",
            "Sku": "75960620960600211",
            "MSRP": "$3.99",
            "Release": "2024-10-23",
            "FOCDueDate": "2024-09-23",
            "Qty.Ord.OnTime": "",
            "Qty.Ord.Late": "",
            "ImageURL": "https://www.universaldist.com/api/v1/images/9b019c9a-2013-4c40-88f1-a930e5a3a26d/raw?size=l",
            "Issue": "2",
            "Publisher": "Marvel",
            "ProductType": "Comic",
            "SeriesSku": "759606209606",
            "IssueSku": "759606209606002",
            "Variant": "1",
            "Printing": "1",
            "Customer": {
              boxNumber: 2,
      				name: "Geoff Deal",
      				pullDate: '17/05/2024'
      			}
          }
      	],
      }, {
      	boxNumber: 3,
      	name: 'James',
      	email: 'james@yipee.com',
      	phone: '(709) 555-7777',
      	userID: 3,
      	customer: true,
      	customerType: 'active',
      	subList: [{
          "skus": [
            "761941385501"
          ],
          "name": "Absolute Power: Origins",
          "publisher": "Dc"
        },
        {
          "skus": [
            "709853002147"
          ],
          "name": "Spawn",
          "publisher": "Image"
        }],
      	pulls: [{
      			"ProductName": "X-MEN #5",
      			"Category": "CB",
      			"ItemCode": "MRVL07240337",
      			"Sku": "75960620920000511",
      			"MSRP": "$4.99",
      			"Release": "2024-10-02",
      			"FOCDueDate": "2024-09-02",
      			"Qty.Ord.OnTime": 2,
      			"Qty.Ord.Late": "",
      			"ImageURL": "https://www.universaldist.com/api/v1/images/060b7c90-8dd4-498b-aeb3-03ce117c3de8/raw?size=l",
      			"Issue": "5",
      			"Publisher": "Marvel",
      			"ProductType": "Comic",
      			"SeriesSku": "759606209200",
      			"IssueSku": "759606209200005",
      			"Variant": "1",
      			"Printing": "1",
      			"Customer": {
              boxNumber:4,
      				name: "James",
      				pullDate: '16/05/2024'
      			}

      		},
      		{
      			"ProductName": "STAR WARS: EWOKS #1 DAVID LOPEZ VARIANT",
      			"Category": "CB",
      			"ItemCode": "MRVL07240241",
      			"Sku": "75960620811100121",
      			"MSRP": "$3.99",
      			"Release": "2024-10-09",
      			"FOCDueDate": "2024-09-09",
      			"Qty.Ord.OnTime": 1,
      			"Qty.Ord.Late": "",
      			"ImageURL": "https://www.universaldist.com/api/v1/images/647d3bc4-7e3c-4ac2-9800-df5878476b12/raw?size=l",
      			"Issue": "1",
      			"Publisher": "Marvel",
      			"ProductType": "Comic",
      			"SeriesSku": "759606208111",
      			"IssueSku": "759606208111001",
      			"Variant": "2",
      			"Printing": "1",
      			"Customer": {
              boxNumber:4,
      				name: "James",
      				pullDate: '16/05/2024'
      			}
      		},{
            "ProductName": "MOON MAN #4 CVR C DANNY EARLS VAR",
            "Category": "COMICS",
            "ItemCode": "0224IM294",
            "Sku": "70985303917400431",
            "MSRP": "$3.99",
            "Release": "2024-09-18",
            "FOCDueDate": "2024-08-26",
            "Qty.Ord.OnTime": "",
            "Qty.Ord.Late": "",
            "ImageURL": "https://www.universaldist.com/api/v1/images/b370036f-3036-4fda-b2ba-1de195e29464/raw?size=l",
            "Issue": "4",
            "Publisher": "Image",
            "ProductType": "Comic",
            "SeriesSku": "709853039174",
            "IssueSku": "709853039174004",
            "Variant": "3",
            "Printing": "1",
            "Customer": {
              boxNumber:4,
      				name: "James",
      				pullDate: '16/05/2024'
      			}
          },{
            "ProductName": "CREEPSHOW VOL 3 #1 (OF 5) CVR A MARTIN MORAZZO",
            "Category": "COMICS",
            "ItemCode": "0724IM261",
            "Sku": "70985304094100111",
            "MSRP": "$3.99",
            "Release": "2024-09-25",
            "FOCDueDate": "2024-09-02",
            "Qty.Ord.OnTime": "2",
            "Qty.Ord.Late": "",
            "ImageURL": "https://www.universaldist.com/api/v1/images/b00b48d0-0b35-48e8-8134-b6a175b71cce/raw?size=l",
            "Issue": "1",
            "Publisher": "Image",
            "ProductType": "Comic",
            "SeriesSku": "709853040941",
            "IssueSku": "709853040941001",
            "Variant": "1",
            "Printing": "1",
            "Customer": {
              boxNumber:4,
      				name: "James",
      				pullDate: '16/05/2024'
      			}
          }
      	],
      }, {
      	boxNumber: 4,
      	name: 'Mike Singer',
      	email: 'singer@test.ca',
      	phone: '(709) 555-8888',
      	userID: 4,
      	customer: true,
      	customerType: 'active',
      	subList: [{
          "skus": [
            "761941380483"
          ],
          "name": "Shazam!",
          "publisher": "Dc"
        }],
      	pulls: [{
      		"ProductName": "IRON MAN #1 SKOTTIE YOUNG VARIANT",
      		"Category": "CB",
      		"ItemCode": "MRVL07240108",
      		"Sku": "75960620898200151",
      		"MSRP": "$4.99",
      		"Release": "2024-10-23",
      		"FOCDueDate": "2024-09-09",
      		"Qty.Ord.OnTime": 2,
      		"Qty.Ord.Late": "",
      		"ImageURL": "https://www.universaldist.com/api/v1/images/0ea3a369-805f-4a17-abbc-7122bf25e386/raw?size=l",
      		"Issue": "1",
      		"Publisher": "Marvel",
      		"ProductType": "Comic",
      		"SeriesSku": "759606208982",
      		"IssueSku": "759606208982001",
      		"Variant": "5",
      		"Printing": "1",
      		"Customer": {
            boxNumber: 4,
      			name: "Mike Singer",
      			pullDate: '15/05/2024'
      		}

      	}],
      }, {
      	boxNumber: 5,
      	name: 'Clayton Smith',
      	email: 'clay@email.com',
      	phone: '(709) 555-9999',
      	userID: 5,
      	customer: true,
      	customerType: 'active',
      	subList: ['Looney Tunes', 'Scooby Doo'],
      	pulls: [],
      }, {
      	boxNumber: '',
      	name: 'Clark Kent',
      	email: 'supes@yipee.com',
      	phone: '(709) 555-5544',
      	userID: 1,
      	customer: true,
      	customerType: 'inactive',
      	subList: ['X-Men', 'Avengers', ],
      	pulls: [],
      }, {
      	boxNumber: '',
      	name: 'Jordan Banner',
      	email: 'greyhulk@emailprovider.com',
      	phone: '(709) 555-5566',
      	userID: 6,
      	customer: true,
      	customerType: 'inactive',
      	subList: ['Scarlet Witch'],
      	pulls: [],
      }, {
      	boxNumber: '',
      	name: 'Mark Smith',
      	email: 'marks@yipee.com',
      	phone: '(709) 555-1111',
      	userID: 7,
      	customer: true,
      	customerType: 'pending',
      	subList: [],
      	pulls: [],
      }, {
      	boxNumber: '',
      	name: 'Hal',
      	email: 'HalJ@yipee.com',
      	phone: '(709) 555-2222',
      	userID: 9,
      	customer: true,
      	customerType: 'pending',
      	subList: [],
      	pulls: [],
      },
    ]);
    
    const [messages, setMessages] = useState([
      {title: 'Flash Sale', date: 'June 8th, 2024', body: 'All back issues are 50% for the weekend!', id: 10001},
      {title: 'Free Comic Book Day', date: 'May 2nd, 2024', body: 'Free Comic Book Day is this Saturday! Great sales storewide!', id: 10002},
      {title: 'New Back Issues', date: 'April 21st, 2024', body: 'New back issues have hit the floor', id: 10003},
      {title: 'Graphic Novel Sale', date: 'April 20th, 2024', body: 'All graphic novels are 30% off, this week only!', id: 10004}
    ]);
        
    const [ comics, setComics ] = useState([]);

    const [ storeInfo, setStoreInfo] = useState({
      address: '123 Topsail Rd, Mt. Pearl',
      hours: {
        sundayopen:'12',
        sundayclose:'4',
        mondayopen:'',
        mondayclose:'',
        tuesdayopen:'11',
        tuesdayclose:'6',
        wednesdayopen:'11',
        wednesdayclose:'6',
        thursdayopen:'11',
        thursdayclose:'6',
        fridayopen:'11',
        fridayclose:'6',
        saturdayopen:'11',
        saturdayclose:'5',
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