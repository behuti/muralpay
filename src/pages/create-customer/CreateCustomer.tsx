import { useState } from "react";
import axios from "axios";
import { MURAL_KEY } from "../../constants";
import { API_HOST, CUSTOMER } from "../../api/endpoints";

const CreateCustomer = () => {
  const [name, setName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log("apikey", MURAL_KEY);

    try {
      const response = await axios.post(
        `${API_HOST}${CUSTOMER}`,
        {
          name,
          organizationType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MURAL_KEY}`,
          },
        }
      );

      setSuccess(true);
      setName("");
      setOrganizationType("");
      console.log(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
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
        <input
          type="text"
          value={organizationType}
          onChange={(e) => setOrganizationType(e.target.value)}
          placeholder="Tipo de organización"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Cliente creado con éxito</p>
        
      )}
    </div>
  );
};

export default CreateCustomer;
