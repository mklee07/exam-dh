import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail(){
    const {id} = useParams()
    const [movie, setMovie] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
          .then((res) => res.json())
          .then((json) => {
            setMovie(json.data.movie);
            setLoading(false);
            console.log(json);
          });
      }, []);

    return(
        <div>
            <h1>{movie.title}</h1>
                <div>
                    <img src={movie.medium_cover_image}></img>
                </div>
                <h1>year: {movie.year}</h1>
                <h1>rating: {movie.rating}</h1>
                <h1>runtime: {movie.runtime}m </h1>
                <h2>{movie.genres && movie.genres.map((genre) => <li key={genre}>{genre}</li>)}</h2>
        </div>
    )
}
export default Detail;