import { useState,useEffect,useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Detail(){
    // useParams를 활용하여 url에서도 id의 파라미터를 가져와 활용할 수 있게됨
    const {id} = useParams()
    const [movie, setMovie] = useState([]);
    const [isHovering,setIsHovering] = useState(false)
    const [yt,setYt] = useState()
    const isEmpty = (str) => {
        if(str === "") return true;
        if(str === null) return true;
        if(str === undefined) return true;
    
        return false;
    }


    useEffect(() => {
        axios(`http://192.168.180.14:3000/movie/getDetail?id=${id}`)
          .then((res) => res)
          .then((res) => {
            setMovie(res.data);
            setYt(res.data.yt_trailer_code)
            console.log(yt);
          });
      }, []);

    function onClickedJpg(e){
        console.log(yt)
          if(!isEmpty(yt)){
              window.location.href=`https://www.youtube.com/watch?v=${yt}`
          }else{
              alert("트레일러가 존재하지 않습니다")
          }
    }


    const onClickedTitle = useCallback(e => {
        window.location.href =  `/`
    }, []);
    
    return(
        <div>
            <div style={{ height: '100%', width:'80%' ,float:'right' }}>
            <div style={{ justifyContent: 'right', height:"100%",width:'75%'}}>
                <div style={{ width: "100%"}}>
                    <h2 style={{cursor:"pointer" }}
                    className="Home"
                    onClick={onClickedTitle}
                    onMouseOver={()=>setIsHovering(true)}
                    onMouseLeave={()=>setIsHovering(false)}
                    data-text-context="true" 
                    fontWeight="bold" 
                    fontSize="24px" 
                    align= 'left'>
                        {movie.title}
                    </h2>
                    <button><src={}></src></button>

                    <table border="1" align="center" height="30%" 
                    style={{width:'100%', height:'250px', borderCollapse:'collapse', }}>
                        <tr  width = "100%" height='30%'>
                            <td bgcolor="whitesmoke" align="center"  ><b>포스트</b></td>
                            <td bgcolor="whitesmoke" align="center"  ><b>개봉 연도</b></td>
                            <td bgcolor="whitesmoke" align="center"  ><b>rating</b></td>
                            <td bgcolor="whitesmoke" align="center"  ><b>runtime</b></td>
                            <td bgcolor="whitesmoke" align="center"  ><b>장르 </b></td>
                            <td bgcolor="whitesmoke" align="center"  ><b>줄거리 </b></td>
                        </tr>
                        <tr width = "100%" height='20%'  style={{whiteSpace: 'pre-line'}}>
                            <td align="center" style={{cursor:"pointer"}} onClick={onClickedJpg}><img src={movie.medium_cover_image}></img></td>
                            <td align="center"><b> &nbsp;{movie.year}</b></td>
                            <td align="center"><b> &nbsp;{movie.rating}</b></td>
                            <td align="center"><b> &nbsp;{movie.runtime}분</b></td>
                            <td align="center"><b> &nbsp;{movie.genres}</b></td>


                            {/* <td align="center"><b> </b>{genre.length>0 && genre.map((genre,idx)=>{
                                let key = genre;
                                return (<div>&nbsp;{key}</div>)
                            })} </td> */}
                            <td align="center"><b> &nbsp;{movie.description_full}</b></td>                            
                        </tr>

                        
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Detail;