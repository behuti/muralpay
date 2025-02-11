/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { MURAL_KEY } from "../../constants";
import { API_HOST, CUSTOMER } from "../../api/endpoints";
import { useUser } from "../../hooks/useUser";

const CreateCustomer = () => {
  const { setUserData } = useUser();
  const [name, setName] = useState("");
  const [organizationType, setOrganizationType] = useState("INDIVIDUAL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [kycLink, setKycLink] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setKycLink(null);

    try {
      const response = await axios.post(
        `${API_HOST}${CUSTOMER}`,
        {
          name,
          organizationType: "BUSINESS",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MURAL_KEY}`,
          },
        }
      );

      const { id } = response.data;
      setCustomerId(id);
      fetchKycLink(id);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Error 401: API Key inválida o no autorizada.");
      } else {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchKycLink = async (id: string) => {
    try {
      const response = await axios.get(
        `${API_HOST}/api/customers/${id}/kyc-link`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MURAL_KEY}`,
          },
        }
      );
      setKycLink(response.data.kycLink);
    } catch (err: any) {
      setError("Error al obtener el enlace de KYC");
    }
  };

  const checkKycStatus = async () => {
    if (!kycLink) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_HOST}/api/customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${MURAL_KEY}`,
          },
        }
      );
      const { status } = response.data;
      // setUserData(name, balance, walletAddress);
      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Error al verificar el estado del KYC");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Crear Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={organizationType}
          onChange={(e) => setOrganizationType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="INDIVIDUAL">Individuo</option>
          <option value="BUSINESS">Empresa</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {kycLink && (
        <div className="mt-4">
          <p className="text-gray-700">Verifica tu identidad:</p>
          <a
            href={kycLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Completar KYC
          </a>
          <button
            onClick={checkKycStatus}
            className="w-full bg-green-500 text-white py-2 mt-2 rounded hover:bg-green-600"
          >
            Verificar KYC
          </button>
        </div>
      )}
      {success && (
        <p className="text-green-500 mt-2">Cliente creado con éxito</p>
      )}
    </div>
  );
};

export default CreateCustomer;
