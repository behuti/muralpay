import { ReactNode, useState } from "react";
import { UserContext } from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({
    name: "",
    balance: 0,
    walletAddress: "",
    kycLink: "",
  });

  const setUserData = (
    name: string,
    balance: number,
    walletAddress: string,
    kycLink: string
  ) => {
    setUser({ name, balance, walletAddress, kycLink });
  };
  return (
    <UserContext.Provider value={{ ...user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
