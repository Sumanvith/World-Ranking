import logo from "../assets/Logo.svg";
import earth from "../assets/hero-image-wr.jpg";
const Header = () => {
  return (
    <div className="relative w-full">
      <img src={earth} alt="earth" className="w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Header;
