API 목록

BaseUrl = http://192.168.180.14:3000/movie

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
- Body { id: String \* 필수 }
