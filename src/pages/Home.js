import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchByName, setSearchByName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?name=${searchByName}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchByName]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <input
        type="text"
        onChange={(event) => setSearchByName(event.target.value)}
        placeholder="recherche"
      />
      <div className="container">
        {data.results.map((characters, index) => {
          return (
            <>
              <div key={index} className="card">
                <h3>{characters.name}</h3>

                <Link to={`/albums/${characters._id}`}>
                  <img
                    src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                    alt=""
                  />
                </Link>

                <p>{characters.description}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
