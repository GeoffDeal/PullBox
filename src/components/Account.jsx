import { useEffect, useState } from "react";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import api from "../api/api.js";
import { toast } from "react-toastify";
import { useAuthHeader } from "../utils/authHeaderSetter";

function Account() {
  const { user, isLoaded } = useUser();
  const [account, setAccount] = useState();
  const getHeaders = useAuthHeader();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const getUser = async () => {
      try {
        const headers = await getHeaders();
        const userRes = await api.get(`/users/${user.id}`, { headers });
        if (!cancelled) {
          setAccount(userRes.data);
        }
      } catch (err) {
        toast.error(`Problem fetching user information: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    getUser();
    return () => {
      cancelled = true;
    };
  }, [user.id, getHeaders]);

  if (!isLoaded || loading) {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (account) {
    return (
      <div className="accountPage pageDisplay">
        <h1>Account Details for {account.name}</h1>
        <h3 className="accountHeader">Name: </h3> <p>{account.name}</p>
        <h3 className="accountHeader">Email: </h3> <p>{account.email}</p>
        <h3 className="accountHeader">Boxnumber: </h3>{" "}
        <p>{account.boxNumber}</p>
        <div>
          <h3 className="accountHeader">Manage Clerk Account:</h3>{" "}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h3 className="accountHeader">Manage Clerk Account:</h3>{" "}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Account;
