import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ favoris }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchByName, setSearchByName] = useState("");
  const [skip, setSkip] = useState(0);
  const [fav, setFav] = useState([]);
  const [page, setPage] = useState(1);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvelbymax.herokuapp.com/characters?name=${searchByName}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchByName, skip, clicked]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="search-bar">
        <input
          type="text"
          onChange={(event) => setSearchByName(event.target.value)}
          placeholder=" 🔎 Retrouvez votre héro Marvel préféré !"
        />
        <p>
          🖱 Un click sur l'image vous indiquera les albums dans lesquels le
          personnage apparait.
        </p>
      </div>

      <div className="container">
        {data.results.map((characters, index) => {
          return (
            <div key={index} className="card">
              <button
                className="favoris-button"
                onClick={() => {
                  const newTab = [...fav];
                  // modification de la copie
                  newTab.push(characters);
                  // mise à jour du state avec la copie
                  setFav(newTab);
                  sessionStorage.setItem("favoris", JSON.stringify(fav));
                  setClicked(true);
                  alert(
                    `Vous avez ajouté${characters.name} à vos favoris, il y restera le temps de votre navigation sur cette page.`
                  );
                }}
              >
                Ajouter aux favoris
              </button>
              <h3>{characters.name}</h3>

              <Link to={`/albums/${characters._id}`}>
                <img
                  src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                  alt=""
                />
              </Link>

              <p>{characters.description}</p>
            </div>
          );
        })}
      </div>
      <footer className="paginate">
        {skip > 0 ? (
          <button
            onClick={() => {
              setSkip(skip - 100);
              setPage(page - 1);
            }}
          >
            page précédente
          </button>
        ) : (
          <div></div>
        )}
        <div className="counter">{page}</div>

        {page <= 15 ? (
          <button
            onClick={() => {
              setSkip(skip + 100);
              setPage(page + 1);
            }}
          >
            page suivante
          </button>
        ) : (
          <div></div>
        )}
      </footer>
    </>
  );
};

export default Home;
