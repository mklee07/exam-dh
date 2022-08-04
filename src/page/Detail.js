import react, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Detail.css";
import { Button } from "react-bootstrap";
import qs from "qs";

//https://getbootstrap.com/docs/5.2/components/buttons/
//bootstrap에서 버튼을 가져와 사용했음.

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [rating, setRating] = useState();
  const [runtime, setRuntime] = useState();
  const [genres, setGenres] = useState();
  //사용 이유 : textarea value값 수정하기 위해
  const [description, setDescription] = useState();
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  //값이 "", null , undefined 일 경우 원치않는 에러를 불러올 수 있기에 이들을 감지하는 isEmpty를 선언하여 사용함. (onclickJpg, genre에서 사용중.)
  const isEmpty = (str) => {
    if (str === "") return true;
    if (str === null) return true;
    if (str === undefined) return true;
    return false;
  };

  useEffect(() => {
    axios(`http://192.168.180.14:3000/movie/getDetail?id=${id}`)
      .then((res) => res.data)
      .then((res) => {
        setDescription(res.description_full);
        setTitle(res.title);
        setYear(res.year);
        setRating(res.rating);
        setGenres(res.genres);
        setRuntime(res.runtime);
        setMovie(res);
        console.log(res.genres);
      });
  }, []);

  //react에서 _를 잘 못읽는걸로 알고 있어서 따로 yt를 usestate로 이용해 res.data.yt_trailer_code를 state에 지정해서 사용했지만 아래와 같이 사용해도 잘 읽어져서 그대로 사용함.
  function onClickedJpg(e) {
    console.log(movie.yt_trailer_code);
    // isEmpty를 활용하여 "", null, undefined를 검사하고 트레일러코드가 "",null,undefined면 알람이 나오고 그 외의 경우엔 유튜브로 통해 트레일러를 볼 수 있게 사용함.
    if (!isEmpty(movie.yt_trailer_code)) {
      window.location.href = `https://www.youtube.com/watch?v=${movie.yt_trailer_code}`;
    } else {
      alert("트레일러가 존재하지 않습니다");
    }
  }

  const onClickedHome = useCallback((e) => {
    window.location.href = `/`;
  }, []);

  //수정 http://192.168.180.14:3000/movie/updateMovie
  const Update = () => {
    const req = qs.stringify({
      id: id,
      title: title,
      year: year,
      rating: rating,
      genres: genres,
      description_full: description,
    });
    console.log(req);
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };
    axios
      .put("http://192.168.180.14:3000/movie/updateMovie", req, { headers })
      .then((res) => {
        alert("수정되었습니다", res);
      })
      .catch(function (res) {
        alert("요청이 에러로 인해 취소 되었습니다");
      });
  };

  // app.put("http://192.168.180.14:3000/movie/updateMovie", (req, res) => {
  //   const { id, title } = req.body;
  //   const movie = movie.map((movie) => {
  //     if (movie.id == id) movie.title = title;
  //     return {
  //       id: movie.id,
  //       title: movie.title,
  //     };
  //   });
  //   res.json({ ok: true, movie: movie });
  // });

  const Save = () => {
    const req = qs.stringify({
      title: title,
      year: year,
      rating: rating,
      runtime: runtime,
      genres: genres,
      description_full: description,
    });
    console.log(req);
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };
    axios
      .post("http://192.168.180.14:3000/movie/setMovie", req, { headers })
      .then((res) => {
        alert("저장되었습니다", res);
      })
      .catch(function (res) {
        alert("요청이 에러로 인해 취소 되었습니다");
      });
  };

  //Delete에서의 body는 header와 함께 보내야함.(매우 중요!)
  const Delete = () => {
    const req = qs.stringify({
      id: id,
    });
    console.log(req);
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };
    axios
      .delete("http://192.168.180.14:3000/movie/delMovie", {
        headers,
        data: req,
      })
      .then(function (response) {
        alert("수정되었습니다");
      })
      .catch(function (res) {
        alert("요청이 에러로 인해 취소 되었습니다");
      });
  };

  return (
    <div>
      <div style={{ height: "100%", width: "90%", float: "right" }}>
        <div
          className="main"
          style={{ justifyContent: "right", width: "90%", alignItems: "" }}
        >
          <div className="header" style={{ width: "100%" }}>
            {/* 리액트에서의 input은 기본적으로 read only 속성을 가지고 있어 value값을 변경못함. */}
            <input
              id="title"
              className="Home"
              style={{ paddingTop: "20px" }}
              data-text-context="true"
              align="left"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                //console.log(title);
              }}
              readOnly={false}
            ></input>
            <Button
              id="test-id"
              hidden=""
              variant="outline-danger"
              onClick={Delete}
              style={{ float: "right", paddingBottom: "10px" }}
            >
              삭제
            </Button>
            <Button
              variant="outline-warning"
              onClick={Update}
              style={{ float: "right", paddingBottom: "10px" }}
            >
              수정
            </Button>
            <Button
              hidden=""
              variant="outline-success"
              onClick={Save}
              style={{ float: "right", paddingBottom: "10px" }}
            >
              저장
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onClickedHome}
              style={{ float: "right", paddingBottom: "10px" }}
            >
              Home
            </Button>
          </div>

          <table
            align="center"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td className="FirstCell" style={{ width: "15%" }}>
                  <b>개봉 연도</b>
                </td>
                <td className="FirstCell">
                  <b>rating</b>
                </td>
                <td className="FirstCell" style={{ width: "25%" }}>
                  <b>runtime</b>
                </td>
                <td className="FirstCell" style={{ width: "35%" }}>
                  <b>장르 </b>
                </td>
              </tr>
              <tr
                width="100%"
                align="center"
                style={{ whiteSpace: "pre-line" }}
              >
                <td className="SecondCell">
                  <input
                    id="SecondCell"
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  ></input>

                  {/* &nbsp;는 빈칸을 나타남 */}
                </td>
                <td className="SecondCell">
                  <input
                    id="SecondCell"
                    value={rating}
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                  ></input>
                </td>
                <td className="SecondCell">
                  <input
                    id="SecondCell"
                    value={runtime}
                    onChange={(e) => {
                      setRuntime(e.target.value);
                    }}
                  ></input>
                </td>
                <td className="SecondCell">
                  <input
                    id="SecondCell"
                    value={genres}
                    onChange={(e) => {
                      setGenres(e.target.value);
                    }}
                    style={{ width: "400px" }}
                  >
                    {/* {!isEmpty(movie.genres) &&
                      movie.genres.replaceAll("{", "").replaceAll("}", "")} */}
                    {/* genre만 하니 랜더링 할때마다 replaceAll 프로퍼티를 못읽다라는 에러가 나왔었음. &&조건문을 활용하니 해결됨. isEmpty를 사용해 "",undefined,null을 검사함 */}
                    {/* replaceAll :  변경하고 싶은 문자열.replaceAll("변경이 될 문자" , "변경하고 싶은 문자") 처럼 사용하면 됨.   */}
                  </input>
                </td>
              </tr>
            </tbody>
          </table>
          {/* 위는 테이블 형식이라 테이블 안에 넣을시 개봉 연도 너비와 같은 너비로 사용이 된다. */}
          <tfoot width="100%">
            <tr>
              <td
                className="FirstCell"
                bgcolor="#0090ff"
                style={{ color: "white" }}
                align="center"
              >
                <b>포스트</b>
              </td>
              <td
                className="FirstCell"
                bgcolor="#0090ff"
                style={{ color: "white", width: "60%" }}
                align="center"
              >
                <b>줄거리 </b>
              </td>
            </tr>
            <tr width="100%">
              <td bgcolor="#f0f4f6" align="center">
                <img
                  style={{ cursor: "pointer", paddingTop: "10px" }}
                  onClick={onClickedJpg}
                  src={movie.medium_cover_image}
                ></img>
                <h6 style={{ color: "#0090ff", paddingTop: "5px" }}>
                  *포스터를 클릭시 트레일러로 넘어갑니다
                </h6>
              </td>
              <td bgcolor="#f0f4f6">
                <textarea
                  style={{ width: "450px", height: "400px" }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </td>
            </tr>
          </tfoot>
        </div>
      </div>
    </div>
  );
}
export default Detail;

{
  /* 장르 반복
  <td align="center"><b> </b>{genre.length>0 && genre.map((genre,idx)=>{
                                let key = genre;
                                return (<div>&nbsp;{key}</div>)
                            })} </td> */
}

// replaceall : <b>{genre.replaceAll("{", "").replaceAll("}", "")}</b>

{
  /* <b>
{!isEmpty(movie.description_full) &&
  Object.keys(movie.description_full).map(
    (description_full, idx) => {
      let key = description_full;
      let value = movie.description_full[key];
      return `${key}=${value}`;
    }
  )}
</b> */
}
