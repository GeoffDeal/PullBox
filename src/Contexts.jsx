import { useState, createContext } from "react";

export const UserContext = createContext({
    username: 'Super Hero',
    email: null,
    userID: 0,
    userType: 'customer'
});

