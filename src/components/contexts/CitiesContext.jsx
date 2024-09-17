import { createContext, useContext, useEffect, useState } from "react";

const CitiesProv = createContext();

function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        alert("Error while fetching data....");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesProv.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesProv.Provider>
  );
}

function useCities() {
  const useCity = useContext(CitiesProv);

  if (useCity === undefined) throw new Error("useCities used outside");
  return useCity;
}

export { CitiesContext, useCities };
