import react, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
//https://getbootstrap.com/docs/5.2/components/buttons/

function Detail() {
  // useParams를 활용하여 url에서도 id의 파라미터를 가져와 활용할 수 있게됨
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [yt, setYt] = useState();
  const [genre, setGenre] = useState();

  const isEmpty = (str) => {
    if (str === "") return true;
    if (str === null) return true;
    if (str === undefined) return true;

    return false;
  };

  useEffect(() => {
    axios(`http://192.168.180.14:3000/movie/getDetail?id=${id}`)
      .then((res) => res)
      .then((res) => {
        setMovie(res.data);
        setYt(res.data.yt_trailer_code);
        setGenre(res.data.genres);
        console.log(res.data.genres);
        console.log(genre);
      });
  }, []);

  function onClickedJpg(e) {
    console.log(yt);
    if (!isEmpty(yt)) {
      window.location.href = `https://www.youtube.com/watch?v=${yt}`;
    } else {
      alert("트레일러가 존재하지 않습니다");
    }
  }

  const onClickedHome = useCallback((e) => {
    window.location.href = `/`;
  }, []);

  return (
    <div>
      <div style={{ height: "100%", width: "90%", float: "right" }}>
        <div style={{ justifyContent: "right", height: "100%", width: "90%" }}>
          <div style={{ width: "100%" }}>
            <h2
              className="Home"
              data-text-context="true"
              fontWeight="bold"
              fontSize="24px"
              align="left"
            >
              {movie.title}
            </h2>
            <Button
              type="button"
              class="btn btn-outline-primary"
              onClick={onClickedHome}
              style={{ float: "right" }}
            >
              Home
            </Button>{" "}
          </div>

          <table
            align="center"
            height="100%"
            style={{
              width: "100%",
              height: "250px",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr width="100%" height="10%">
                <td bgcolor="#0090ff" style={{ color: "white" }} align="center">
                  <b>포스트</b>
                </td>
                <td bgcolor="#0090ff" style={{ color: "white" }} align="center">
                  <b>개봉 연도</b>
                </td>
                <td bgcolor="#0090ff" style={{ color: "white" }} align="center">
                  <b>rating</b>
                </td>
                <td bgcolor="#0090ff" style={{ color: "white" }} align="center">
                  <b>runtime</b>
                </td>
                <td bgcolor="#0090ff" style={{ color: "white" }} align="center">
                  <b>장르 </b>
                </td>
                <td bgcolor="#0090ff" style={{ color: "white" }} align="center">
                  <b>줄거리 </b>
                </td>
              </tr>
              <tr width="100%" height="20%" style={{ whiteSpace: "pre-line" }}>
                <td
                  bgcolor="#f0f4f6"
                  align="center"
                  style={{ cursor: "pointer" }}
                  onClick={onClickedJpg}
                >
                  <img src={movie.small_cover_image}></img>
                </td>
                <td align="center" bgcolor="#f0f4f6">
                  <b> &nbsp;{movie.year}</b>
                </td>
                <td align="center" bgcolor="#f0f4f6">
                  <b> &nbsp;{movie.rating}</b>
                </td>
                <td align="center" bgcolor="#f0f4f6">
                  <b> &nbsp;{movie.runtime}분</b>
                </td>
                <td align="center" bgcolor="#f0f4f6">
                  <>{genre.replaceAll("{", "").replaceAll("}", "")}</>
                </td>
                <td align="center" bgcolor="#f0f4f6">
                  <b> &nbsp;{movie.description_full}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <h6>포스터를 클릭시 트레일러로 넘어갑니다</h6>
        </div>
      </div>
    </div>
  );
}
export default Detail;

{
  /* <td align="center"><b> </b>{genre.length>0 && genre.map((genre,idx)=>{
                                let key = genre;
                                return (<div>&nbsp;{key}</div>)
                            })} </td> */
}
