import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";
import "./App.css";

export default function App() {
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [addCountry, setAddCountry] = useState("");
  const [removeCountry, setRemoveCountry] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/countries");
        setVisitedCountries(res.data.countries ?? []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleAddCountry = async (e) => {
    e.preventDefault();
    const countryCode = addCountry.trim().toUpperCase();
    if (!countryCode || visitedCountries.includes(countryCode)) return;

    try {
      await axios.post("http://localhost:3000/countries", { country: countryCode });
      setVisitedCountries((prev) => [...prev, countryCode]);
      setAddCountry("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveCountry = async (e) => {
    e.preventDefault();
    const countryCode = removeCountry.trim().toUpperCase();
    if (!countryCode || !visitedCountries.includes(countryCode)) return;

    try {
      console.log("delete")
      await axios.delete(`http://localhost:3000/countries/${countryCode}`);
      setVisitedCountries((prev) => prev.filter((c) => c !== countryCode));
      setRemoveCountry("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Country Visitor</h1>
      <p>Enter Country Code → Canada = CAN, Russia = RUS</p>

      <form onSubmit={handleAddCountry}>
        <p>Add Country</p>
        <input
          type="text"
          value={addCountry}
          onChange={(e) => setAddCountry(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleRemoveCountry}>
        <p>Remove Country</p>
        <input
          type="text"
          value={removeCountry}
          onChange={(e) => setRemoveCountry(e.target.value)}
        />
        <button type="submit">Remove</button>
      </form>

      <ComposableMap>
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const isVisited = visitedCountries.includes(geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isVisited ? "#FF4136" : "#003366",
                      stroke: "#FFFFFF",
                    },
                    hover: {
                      fill: isVisited ? "#FF695e" : "#335b8f",
                      stroke: "#FFFFFF",
                    },
                    pressed: {
                      fill: isVisited ? "#ff7f73" : "#4d72a4",
                      stroke: "#FFFFFF",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
