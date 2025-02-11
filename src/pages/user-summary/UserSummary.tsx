/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { API_HOST } from "../../api/endpoints";
import axios from "axios";
import { MURAL_KEY } from "../../constants";

const UserSummary = () => {
  const { userId } = useUser();
  const [walletBalance, setWalletBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState("");

  const fetchAccount = async () => {
    try {
      const response = await axios.get(`${API_HOST}/api/accounts/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MURAL_KEY}`,
        },
      });
      setWalletAddress(response.data.address);
      setWalletBalance(response.data.balance);
    } catch (err: any) {
      setError("Error fetching KYC link");
    }
  };

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <div>
      {userId}
      {error && error}
    </div>
  );
};

export default UserSummary;
