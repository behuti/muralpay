import { ReactNode, useState } from "react";
import { UserContext } from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({
    name: "",
    balance: 0,
    walletAddress: "",
  });

  const setUserData = (
    name: string,
    balance: number,
    walletAddress: string
  ) => {
    setUser({ name, balance, walletAddress });
  };
  return (
    <UserContext.Provider value={{ ...user, setUserData, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
