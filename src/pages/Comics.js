import axios from "axios";
import { useState, useEffect } from "react";

const Comics = ({ id }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchByName, setSearchByName] = useState("");
  const [fav, setFav] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvelbymax.herokuapp.com/comics/?title=${searchByName}&skip=${skip}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [skip, searchByName]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="search-bar">
        <input
          type="text"
          onChange={(event) => setSearchByName(event.target.value)}
          placeholder=" 🔎 Recherchez votre comic Marvel préféré !"
        />
      </div>

      <div className="container">
        {data.results.map((comics, index) => {
          return (
            <div key={index} className="card">
              <button
                className="favoris-button"
                onClick={() => {
                  const newTab = [...fav];
                  // modification de la copie
                  newTab.push(comics);
                  // mise à jour du state avec la copie
                  setFav(newTab);
                  sessionStorage.setItem("favoris", JSON.stringify(fav));
                }}
              >
                Ajouter aux favoris
              </button>
              <h3>{comics.title}</h3>

              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt=""
              />

              <p>{comics.description}</p>
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

export default Comics;
