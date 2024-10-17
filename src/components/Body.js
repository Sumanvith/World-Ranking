import { useState } from "react";

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

  const handleRegionClick = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions((selectedRegions) =>
        selectedRegions.filter((r) => r !== region)
      );
    } else {
      setSelectedRegions((selectedRegions) => [...selectedRegions, region]);
    }
  };
  console.log(selectedRegions);
  return (
    <div className="relative -mt-32 z-10 flex justify-center items-center ">
      <div className="w-11/12 max-h-screen overflow-hidden pb-3 rounded-lg border border-[#6C727F] bg-[#1B1D1F]">
        <div className="px-10 py-5 flex flex-row justify-between items-center w-full">
          <h1 className="p-2 text-[#6C727F] font-bold text-lg">
            Found 234 Countries
          </h1>
          <input
            className="p-2 rounded-lg bg-[#282B30] placeholder:text-[#6C727F] w-3/12"
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

            <div className="grid grid-cols-5 gap-y-2 text-white p-4 rounded-b-lg">
              <div>
                <img
                  src="china-flag-url.png"
                  alt="China Flag"
                  className="w-8 h-6"
                />
              </div>
              <div>China</div>
              <div>1,402,112,000</div>
              <div>9,706,961</div>
              <div>Asia</div>

              <div>
                <img
                  src="india-flag-url.png"
                  alt="India Flag"
                  className="w-8 h-6"
                />
              </div>
              <div>India</div>
              <div>1,439,323,776</div>
              <div>3,287,590</div>
              <div>Asia</div>

              <div>
                <img
                  src="usa-flag-url.png"
                  alt="USA Flag"
                  className="w-8 h-6"
                />
              </div>
              <div>United States</div>
              <div>329,484,123</div>
              <div>9,372,610</div>
              <div>Americas</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col ml-12">
            <label htmlFor="sort" className="mb-2 text-sm text-[#6C727F]">
              Sort by
            </label>
            <select
              id="sort"
              className="px-4 py-2 w-60 mb-3 rounded-lg border border-[#6C727F] bg-[#1B1D1F] text-[#D2D5DA]">
              <option>Population</option>
              <option>Area</option>
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
                  value="Member of the United Nations"></input>
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
                  value="Independent"></input>
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
