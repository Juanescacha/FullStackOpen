import { useEffect, useState } from "react";
import axios from "axios";

const Countries = ({ countriesToShow }) => (
  <>
    {countriesToShow.map((country, i) => (
      <div key={i}>{country.name.common}</div>
    ))}
  </>
);

function App() {
  const [newSearchCountry, setNewSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const fetchHook = () => {
    const eventHandler = response => {
      setCountries(response.data);
    };
    axios.get("https://restcountries.com/v3.1/all").then(eventHandler);
  };

  const handleSearchCountry = event => {
    setNewSearchCountry(event.target.value);
  };

  useEffect(fetchHook, []);

  const countriesToShow =
    !newSearchCountry || newSearchCountry === ""
      ? countries
      : countries.filter(country =>
          country.name.common
            .toLowerCase()
            .includes(newSearchCountry.toLocaleLowerCase())
        );

  return (
    <div>
      find countries
      <input value={newSearchCountry} onChange={handleSearchCountry} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
