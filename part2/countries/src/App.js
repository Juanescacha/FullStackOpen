import { useEffect, useState } from "react"
import axios from "axios"

const Countries = ({ countriesToShow, newSearchCountry }) => {
  if (newSearchCountry === "") {
    return <div>Search a Country</div>
  } else {
    if (countriesToShow.length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else {
      if (countriesToShow.length > 1) {
        return (
          <>
            {countriesToShow.map((country, i) => (
              <div key={i}>{country.name.common}</div>
            ))}
          </>
        )
      } else {
        if (countriesToShow.length === 1) {
          return (
            <div>
              <h1>{countriesToShow[0].name.common}</h1>
              <div>capital {countriesToShow[0].capital}</div>
              <div>area {countriesToShow[0].area}</div>
              <h3>languages:</h3>
              <ul>
                {Object.values(countriesToShow[0].languages).map(value => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
              <img
                alt={countriesToShow[0].flag}
                src={countriesToShow[0].flags.png}
              />
            </div>
          )
        } else {
          return <div>0 matches, try another search</div>
        }
      }
    }
  }
}
function App() {
  const [newSearchCountry, setNewSearchCountry] = useState("")
  const [countries, setCountries] = useState([])
  const fetchHook = () => {
    const eventHandler = response => {
      setCountries(response.data)
    }
    axios.get("https://restcountries.com/v3.1/all").then(eventHandler)
  }

  const handleSearchCountry = event => {
    setNewSearchCountry(event.target.value)
  }

  useEffect(fetchHook, [])

  const countriesToShow = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(newSearchCountry.toLocaleLowerCase())
  )

  return (
    <div>
      find countries{" "}
      <input value={newSearchCountry} onChange={handleSearchCountry} />
      <Countries
        countriesToShow={countriesToShow}
        newSearchCountry={newSearchCountry}
      />
    </div>
  )
}

export default App
