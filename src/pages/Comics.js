import axios from "axios";
import { useState, useEffect } from "react";

const Comics = (id) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchByName, setSearchByName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/${id}?title=${searchByName}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, searchByName]);

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
        {data.results.map((comics, index) => {
          return (
            <div key={index} className="card">
              <h3>{comics.title}</h3>

              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
