import { Link } from "react-router-dom";

const Favoris = () => {
  const obj = JSON.parse(sessionStorage.getItem("favoris"));

  return obj ? (
    <div className="container">
      {obj.map((characters, index) => {
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
  ) : (
    <div>Pas de favoris sélectionnés !</div>
  );
};

export default Favoris;
