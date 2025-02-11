import { createContext } from "react";

type UserContextType = {
  name: string;
  balance: number;
  walletAddress: string;
  setUserData: (name: string, balance: number, walletAddress: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
