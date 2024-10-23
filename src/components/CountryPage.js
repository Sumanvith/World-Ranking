import { useParams } from "react-router-dom";

const CountryPage = () => {
  const { countryCode } = useParams();

  return <div>Details for Country: {countryCode}</div>;
};

export default CountryPage;
