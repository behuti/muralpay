import { createContext } from "react";

type UserContextType = {
  name: string;
  balance: number;
  walletAddress: string;
  userId: string;
  setUserData: (name: string, balance: number, walletAddress: string) => void;
  setUserId: (id: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
