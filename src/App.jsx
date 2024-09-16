import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import PricingPage from "./pages/PricingPage";
import PagenotFound from "./pages/PagenotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

import { useEffect, useState } from "react";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
