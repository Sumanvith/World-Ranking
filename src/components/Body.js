import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountryPage from "./CountryPage";
const Body = () => {
  const regions = [
    "Americas",
    "Antarctic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [listOfCountries, setListOfCountries] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [statusFilters, setStatusFilters] = useState({
    UN: false,
    Independent: false,
  });

  const handleRegionClick = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions((selectedRegions) =>
        selectedRegions.filter((r) => r !== region)
      );
    } else {
      setSelectedRegions((selectedRegions) => [...selectedRegions, region]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://restcountries.com/v3.1/all");
    const json = await data.json();
    setListOfCountries(json);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const filterCountries = (countries) => {
    return countries.filter((country) => {
      const regionMatch =
        selectedRegions.length === 0 ||
        selectedRegions.includes(country.region);
      const statusMatch =
        (!statusFilters.UN || country.unMember) &&
        (!statusFilters.Independent || country.independent);
      const searchMatch =
        searchText.length === 0 ||
        country.name.common.toLowerCase().includes(searchText.toLowerCase()) ||
        country.region.toLowerCase().includes(searchText.toLowerCase()) ||
        (country.subregion &&
          country.subregion.toLowerCase().includes(searchText.toLowerCase()));

      return regionMatch && statusMatch && searchMatch;
    });
  };

  const sortedAndFilteredCountries = filterCountries(listOfCountries).sort(
    (a, b) => {
      if (selectedOption === "population") {
        return b.population - a.population;
      } else if (selectedOption === "area") {
        return b.area - a.area;
      }
      return 0;
    }
  );

  return (
    <div className="relative -mt-32 z-10 flex justify-center items-center ">
      <div className="w-11/12 max-h-screen overflow-hidden pb-3 rounded-lg border border-[#6C727F] bg-[#1B1D1F]">
        <div className="px-10 py-5 flex flex-row justify-between items-center w-full">
          <h1 className="p-2 text-[#6C727F] font-bold text-lg">
            Found {sortedAndFilteredCountries.length} Countries
          </h1>
          <input
            onChange={handleSearchText}
            className="p-2 rounded-lg bg-[#282B30] text-[#D2D5DA] placeholder:text-[#6C727F] w-3/12"
            type="text"
            placeholder="Search by Name, Region, Subregion"></input>
        </div>

        <div className="relative">
          <div className="absolute w-8/12 top-2 right-10">
            <div className="grid grid-cols-5 text-white font-semibold p-4 rounded-t-lg">
              <div className="text-[#6C727F]">Flag</div>
              <div className="text-[#6C727F]">Name</div>
              <div className="text-[#6C727F]">Population</div>
              <div className="text-[#6C727F]">Area (km²)</div>
              <div className="text-[#6C727F]">Region</div>
            </div>
            <div className="divide-y divide-[#3d4045]">
              <div></div>
              <div></div>
            </div>
            <div className="max-h-screen mt-5 overflow-y-auto scrollbar-hide">
              {sortedAndFilteredCountries.map((ctryData, index) => (
                <Link
                  to={`/country/${ctryData.cca3}`}
                  key={index}
                  className="grid grid-cols-5 text-white m-2 p-2 rounded-b-lg">
                  <div>
                    <img
                      className="w-13 h-12 rounded-lg"
                      src={ctryData.flags.png}
                      alt={ctryData.flags.alt}
                    />
                  </div>
                  <div>{ctryData.name.common}</div>
                  <div>{ctryData.population.toLocaleString()}</div>
                  <div>{ctryData.area.toLocaleString()}</div>
                  <div>{ctryData.region}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col ml-12">
            <label htmlFor="sort" className="mb-2 text-sm text-[#6C727F]">
              Sort by
            </label>
            <select
              onChange={handleSelectChange}
              id="sort"
              className="px-4 py-2 w-60 mb-3 rounded-lg border border-[#6C727F] bg-[#1B1D1F] text-[#D2D5DA]">
              <option value="">Select an option</option>
              <option value="population">Population</option>
              <option value="area">Area</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col ml-12 w-1/5">
            <label htmlFor="region" className="mb-2 text-sm text-[#6C727F]">
              Region
            </label>
            <div className="group flex flex-row flex-wrap gap-4">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionClick(region)}
                  className={`text-[#D2D5DA] rounded-xl px-4 py-2 ${
                    selectedRegions.includes(region)
                      ? "bg-[#282B30]"
                      : "bg-transparent"
                  }`}>
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col ml-12">
            <label className="mb-2 text-sm text-[#6C727F]">Status</label>
            <div className="flex flex-col flex-wrap">
              <div className="flex items-center">
                <input
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  type="checkbox"
                  id="UN"
                  name="UN"
                  value="Member of the United Nations"
                  checked={statusFilters.UN}
                  onChange={() =>
                    setStatusFilters((prev) => ({ ...prev, UN: !prev.UN }))
                  }></input>
                <label className="text-[#D2D5DA] px-4 py-2" htmlFor="UN">
                  Member of the United Nations
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  type="checkbox"
                  id="IND"
                  name="IND"
                  value="Independent"
                  checked={statusFilters.Independent}
                  onChange={() =>
                    setStatusFilters((prev) => ({
                      ...prev,
                      Independent: !prev.Independent,
                    }))
                  }></input>
                <label className="text-[#D2D5DA] px-4 py-2" htmlFor="IND">
                  Independent
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
