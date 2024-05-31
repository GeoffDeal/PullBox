import { useState, createContext } from "react";

export const UserContext = createContext({
    username: 'Super Hero',
    firstName: 'John',
    lastName: 'Doe',
    email: null,
    phone: "(709) 555-5555",
    userID: 0,
    userType: 'customer'
});

export const ComicList = createContext([
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
])
