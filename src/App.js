import axios from 'axios'
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Countries from './components/Countries';
import Pagination from './components/Pagination';

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) //текущая страница
  const [countriesPerPage] = useState(10) //кол-во стран на странице
  const [apiKey] = useState('ddb9779a8747ca77e448233c117523c0')

  useEffect(()=> {
    const getCountries = async () => {
      setLoading(true)
      const res = await axios.get(`https://api.countrylayer.com/v2/all?access_key=${apiKey}`)
      setCountries(res.data)
      setLoading(false)
    }
    getCountries()
  }, [])

  const lastCountryIndex = currentPage * countriesPerPage //индекс последней страницы
  const firstCountryIndex = lastCountryIndex - countriesPerPage //индекс первой страницы
  const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex) //текущая страница / часть стран 

  const paginate = pageNumber => setCurrentPage(pageNumber) //чтобы страница переключалась

  const nextPage = () => setCurrentPage (prev => prev + 1) // кнопка переключения страницы через далее
  const prevPage = () => setCurrentPage (prev => prev - 1)
    return (
    <>
    <Header />
    <Countries currentCountry={currentCountry} loading={loading} />
    <Pagination  countriesPerPage={countriesPerPage} totalCountries={countries.length} paginate={paginate}/>

    <button className='btn' onClick={prevPage}>prev</button>
    <button className='btn' onClick={nextPage}>next</button>
    </>
  );
}

export default App;
