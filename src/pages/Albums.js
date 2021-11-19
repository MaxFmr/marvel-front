import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Albums = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      {data.comics.map((comics, index) => {
        return <div key={index}>{comics.title}</div>;
      })}
    </div>
  );
};

export default Albums;
