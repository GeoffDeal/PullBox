import { useAuth } from "@clerk/clerk-react";
import { useCallback } from "react";

export function useAuthHeader() {
  const { getToken, isLoaded } = useAuth();

  const getHeaders = useCallback(async () => {
    if (!isLoaded) return;
    try {
      const token = await getToken();
      return { Authorization: `Bearer ${token}` };
    } catch (err) {
      console.error(err);
    }
  }, [getToken, isLoaded]);
  return getHeaders;
}
