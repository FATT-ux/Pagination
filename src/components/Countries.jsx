import React from "react";

function Countries({currentCountry, loading}){
    if(loading){
        return <h2>loading...</h2>
    }
    return(
        <ul className="list-group mb-2">
            {
                currentCountry.map((country, index) => (
                    <li className="list-group-item">{country.name}
                    <img src={country.flag} alt="флаг"  className="ml-2"/>
                    </li>
                ))
            }
        </ul>
    )
}
export default Countries