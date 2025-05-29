import { createContext, useState, useEffect } from "react";
import api from "./api/api.js";
import { useAuth } from "@clerk/clerk-react";
import { useAuthHeader } from "./utils/authHeaderSetter.js";

export const PriceAdjustments = createContext();

const Contexts = ({ children }) => {
  const [priceAdjustments, setPriceAdjustments] = useState();
  const { isLoaded } = useAuth();
  const getHeaders = useAuthHeader();

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    const fetchAdjustments = async () => {
      try {
        const headers = await getHeaders();

        const res = await api.get("/priceadjustments", { headers });
        if (!cancelled) setPriceAdjustments(res.data);
      } catch (err) {
        console.error("Error fetching adjustments", err);
      }
    };

    fetchAdjustments();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, getHeaders]);

  return (
    <PriceAdjustments.Provider
      value={{ priceAdjustments, setPriceAdjustments }}
    >
      {children}
    </PriceAdjustments.Provider>
  );
};

export default Contexts;
