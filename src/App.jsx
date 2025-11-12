import { useState, useEffect } from "react"
import axios from "axios"
import "./index.css"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
      .catch(error => console.error("Error al obtener los países:", error))
  }, [])

  const handleSearchChange = (event) => setSearch(event.target.value)

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  )

  const renderCountries = () => {
    if (search === "") return <p>Escriba el inicio del nombre de un país.</p>

    if (filteredCountries.length > 10)
      return <p>Demasiados resultados. Especifique mejor su búsqueda.</p>

    if (filteredCountries.length > 1)
      return ( 
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )
 
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      const languages = Object.values(country.languages || {})

      return (
        <div className="country-details">
          <h2>{country.name.common}</h2>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Área:</strong> {country.area} km²</p>
          <h3>Idiomas:</h3>
          <ul>
            {languages.map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={`Bandera de ${country.name.common}`}
            width="200"
          />
        </div>
      )
    }

    return <p>No se encontraron países.</p>
  }

  return (
    <div className="app-container">
      <h1>Países</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Escribe el inicio del nombre de un país..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {renderCountries()}
    </div>
  )
}

export default App
