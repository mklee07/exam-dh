API 목록

BaseUrl = http://192.168.180.14:3000/movie
APP.JSON =

1. 목록조회

- GET /getMovies

2.  상세조회

- GET /getDetail
- Param ( id : String \* 필수)

3.  목록추가

- POST /setMovie
- Body {
  url : String,
  imdb_code : String,
  title : String,
  title_english : String,
  title_long : String,
  slug : String,
  year : Integer,
  rating : Integer,
  runtime : Integer,
  genres : String,
  summary : String,
  description_full : String,
  synopsis : String,
  yt_trailer_code : String,
  language : String,
  mpa_rating : String,
  background_image : String,
  background_image_original : String,
  small_cover_image : String,
  medium_cover_image : String,
  large_cover_image : String,
  description_full : String,
  state : String,
  date_uploaded : String,
  date_uploaded_unix : Integer
  }

4. 상세수정

- PUT /updateMovie
- Body { id : Integer , \* 필수
  title : String,
  medium_cover_image : String,
  year : Integer,
  rating : Integer,
  runtime : Integer,
  description_full : String,
  }

5. 목록삭제

- DELETE /delMovie
- Body { id: Integer \* 필수 }

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

          const req = qs.stringify({
      id: id,

  });
  const headers = {
  "content-type": "application/x-www-form-urlencoded",
  };
  axios
  .delete("http://192.168.180.14:3000/movie/delMovie", { headers }, req)
  .then(function (res) {
  alert("수정되었습니다");
  console.log(Update);
  })
  .catch((res) => {
  alert("error");
  });
  console.log(`id: ${id}`);

GET http://아이피:포트/graph/getCalendarGraph

Rquest Data

- 모든 Parameter는 필수 값
  id : Integer
  strDate : String ex) 2022-01-01
  endDate : String ex) 2022-01-31

Response Data

- data [{"id":1,"movie_id":1,"rating_number":7,"view_number":36724,"reply_number":54,"date":"2022-01-01"}]

http://192.168.180.14:3000/graph/getMovieGraph
