import { createContext, useState } from "react";

export const UserContext = createContext();
export const TaxRates = createContext();
export const ConversionRate = createContext();

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

  const [taxRates, setTaxRates] = useState({});
  const [conversion, setConversion] = useState(1);

  return (
    <ConversionRate.Provider value={{ conversion, setConversion }}>
      <TaxRates.Provider value={{ taxRates, setTaxRates }}>
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      </TaxRates.Provider>
    </ConversionRate.Provider>
  );
};

export default Contexts;
