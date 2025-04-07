import { createContext, useState } from "react";

export const UserContext = createContext();
// export const TaxRates = createContext();
// export const ConversionRate = createContext();
export const PriceAdjustments = createContext();

const Contexts = ({ children }) => {
  const [user, setUser] = useState({
    boxNumber: 2,
    name: "John Doe",
    email: "email@emailprovider.com",
    phone: "(709) 555-5555",
    customer: false,
    id: 1,
    customerType: "active",
  });

  const [priceAdjustments, setPriceAdjustments] = useState({
    conversion: 1,
    taxRates: {
      Hardcover: 5,
      Omnibus: 5,
      "Trade Paperback": 5,
      Comic: 15,
      "Box Set": 15,
      "Graphic Novel": 5,
      Poster: 15,
      Incentive: 15,
    },
  });

  return (
    <PriceAdjustments.Provider
      value={{ priceAdjustments, setPriceAdjustments }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </PriceAdjustments.Provider>
  );
};

export default Contexts;
