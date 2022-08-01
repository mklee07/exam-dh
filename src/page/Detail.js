import { useState,useEffect,useCallback } from "react";
import { useParams } from "react-router-dom";


function Detail(){
    // useParams를 활용하여 url에서도 id의 파라미터를 가져와 활용할 수 있게됨
    const {id} = useParams()
    const [movie, setMovie] = useState([]);
    const [loading,setLoading] = useState(true);
    const [isHovering,setIsHovering] = useState(0)
    
    if(isHovering = isHovering(1)){
        
    }

    useEffect(() => {
        fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
          .then((res) => res.json())
          .then((json) => {
            setMovie(json.data.movie);
            setLoading(false);
            console.log(json);
          });
      }, []);

    const onClickedJpg = ()=>{

    }
    const onClickedTitle = useCallback(e => {
        window.location.href = "/"
    }, []);
    
    const onMouseOver = useCallback (e=>{
        setIsHovering=(() =>setIsHovering(1))
    })
    const onMouseLeave = useCallback (e=>{
        setIsHovering=(() =>setIsHovering(0))
    })

    return(
        <div>
            <div style={{ height: '100%', width:'80%' ,float:'right'}}>
            <tr  width = "100%" height='30%'>
                            <img src={movie.large_cover_image} onClick={onClickedJpg}></img>
                        </tr>
            <div style={{ justifyContent: 'right', height:"100%",width:'75%'}}>
                <div style={{ width: "100%"}}>
                    <h2 
                    onClick={onClickedTitle}
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                    data-text-context="true" 
                    fontWeight="bold" 
                    fontSize="24px" 
                    align= 'left'>
                        {movie.title}
                    </h2>

                    <table border="1" align="center" height="30%" 
                    style={{width:'100%', height:'250px', borderCollapse:'collapse', }}>
                        <tr  width = "100%" height='30%'>
                            <td bgcolor="whitesmoke" align="center"  ><b>개봉 <br/>연도</b></td>
                            <td >&nbsp;{movie.year}</td>
                        </tr>
                        <tr width = "100%" height='20%'  style={{whiteSpace: 'pre-line'}}>
                            <td bgcolor="whitesmoke" align="center"><b> rating</b></td>
                            <td>&nbsp;{movie.rating}</td>
                        </tr>
                        <tr width = "100%" height='20%'  style={{whiteSpace: 'pre-line'}}>
                            <td bgcolor="whitesmoke" align="center"><b> runtime</b></td>
                            <td>&nbsp;{movie.runtime}분</td>
                        </tr>
                        <tr>
                            <td bgcolor="whitesmoke" align="center"><b>장르</b></td>
                            <b>&nbsp;{movie.genres[0]}</b>{movie.genres.length >1 && movie.genres.map((genre) => <b key={genre}>,&nbsp;{genre}</b>)}
                        </tr>
                        <tr>
                            <td bgcolor="whitesmoke" align="center"><b>줄거리</b></td>
                            <td>{movie.description_full}</td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Detail;