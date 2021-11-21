import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="container">
      <button
        onClick={() => {
          navigate("/comics");
        }}
      >
        Tous les comics Marvel
      </button>
      <img src={logo} alt="" />
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Les Heros Marvel
      </button>
      <button
        onClick={() => {
          navigate("/favoris");
        }}
      >
        Mes favoris
      </button>
    </header>
  );
};

export default Header;
