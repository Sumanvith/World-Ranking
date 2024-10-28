import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const CountryPage = () => {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState([]);
  const [neighbouring, setNeighbouring] = useState([]);

  useEffect(() => {
    fetchCountry();
  }, [countryCode]);

  const fetchCountry = async () => {
    const data = await fetch(
      "https://restcountries.com/v3.1/alpha/" + countryCode
    );
    const json = await data.json();
    setCountryData(json);

    if (json.length > 0) {
      const borders = json[0].borders || [];
      if (borders.length > 0) {
        const neighboringData = await Promise.all(
          borders.map(async (borderCode) => {
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${borderCode}`
            );
            const borderCountry = await response.json();
            return borderCountry[0];
          })
        );
        setNeighbouring(neighboringData);
      } else {
        setNeighbouring("No bordering countries");
      }
    }
  };

  return (
    <div className="relative -mt-16 text-white z-10 flex justify-center items-center">
      <div className="border border-[#3d4045] h-full bg-[#1B1D1F] rounded-lg w-7/12">
        <div className="relative -mt-16 flex justify-center items-center">
          <img
            className="w-2/5 rounded-2xl"
            src={countryData[0]?.flags?.svg}
            alt={countryData[0]?.flags?.alt}></img>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-10 text-5xl">{countryData[0]?.name?.common}</div>
          <div className="mt-2 mb-10 text-xl">
            {countryData[0]?.name?.official}
          </div>
          <div className="flex flex-row justify-around w-4/5">
            <div className="flex items-center divide-x-2 divide-[#1B1D1F] bg-[#282B30] rounded-xl p-2">
              <span className="p-1 px-4">Population</span>
              <span className="p-1 px-4">
                {countryData[0]?.population?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center divide-x-2 divide-[#1B1D1F] bg-[#282B30] rounded-xl p-2">
              <span className="p-1 px-4">
                Area(km<sup>2</sup>)
              </span>
              <span className="p-1 px-4">
                {countryData[0]?.area?.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex flex-col divide-y-2 py-5 divide-[#282B30] justify-between w-full">
            <div className="py-5"></div>
            <div className="flex flex-row justify-between px-5 py-5">
              <span className="text-[#6C727F]">Capital</span>
              <span>{countryData[0]?.capital?.[0]}</span>
            </div>
            <div className="flex flex-row justify-between px-5 py-5">
              <span className="text-[#6C727F]">Subregion</span>
              <span>{countryData[0]?.subregion}</span>
            </div>
            <div className="flex flex-row justify-between px-5 py-5">
              <span className="text-[#6C727F]">Language</span>
              <span>
                {countryData[0]?.languages
                  ? Object.values(countryData[0].languages).join(", ")
                  : "No languages available"}
              </span>
            </div>
            <div className="flex flex-row justify-between px-5 py-5">
              <span className="text-[#6C727F]">Currencies</span>
              <span>
                {countryData[0]?.currencies
                  ? `${Object.values(countryData[0].currencies)[0]?.name} (${
                      Object.values(countryData[0].currencies)[0]?.symbol
                    })`
                  : "No currency available"}
              </span>
            </div>
            <div className="flex flex-row justify-between px-5 py-5">
              <span className="text-[#6C727F]">Continents</span>
              <span>
                {countryData[0]?.continents
                  ? countryData[0].continents.join(", ")
                  : "No continent information available"}
              </span>
            </div>
            <div className="flex flex-col justify-between px-5 py-5">
              <span className="text-[#6C727F] pb-2">
                Neighbouring Countries
              </span>
              <div className="flex flex-wrap gap-3">
                {Array.isArray(neighbouring) && neighbouring.length > 0
                  ? neighbouring.map((neighbor) => (
                      <Link
                        to={`/country/${neighbor.cca3}`}
                        key={neighbor.cca3}
                        className="text-center">
                        <img
                          src={neighbor.flags.svg}
                          alt={`Flag of ${neighbor.name.common}`}
                          className="w-16 h-10 rounded-md"
                        />
                        <div>{neighbor.name.common}</div>
                      </Link>
                    ))
                  : neighbouring}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
