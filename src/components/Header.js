import logo from "../img/logo.png";
import { Link } from "react-router-dom";
// import Favoris from "../pages/Favoris";

const Header = () => {
  return (
    <header>
      <Link to="/comics">
        <button>Tous les comics Marvel</button>
      </Link>
      <img src={logo} alt="" />
      <Link to="/">
        <button>Les Heros Marvel</button>
      </Link>
      <Link to="/favoris">
        <button>Mes favoris</button>
      </Link>
    </header>
  );
};

export default Header;
