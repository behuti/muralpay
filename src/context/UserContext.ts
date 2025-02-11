import { createContext } from "react";

type UserContextType = {
  name: string;
  balance: number;
  walletAddress: string;
  kycLink: string;
  setUserData: (
    name: string,
    balance: number,
    walletAddress: string,
    kycLink: string
  ) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
