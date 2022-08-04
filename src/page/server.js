//클라이언트 PUT & PATCH API 요청(데이터 전체 수정 및 단일 수정)

//전체 데이터 수정
axios
  .put("http://localhost:3000/api/users/update", {
    id: 1,
    name: "개발이 취미인 사람",
  })

  //성공시 then 실행
  .then(function (response) {
    console.log(response);
  })

  //실패 시 catch 실행
  .catch(function (error) {
    console.log(error);
  });

//특정 데이터 수정
axios
  .patch(`http://localhost:3000/api/user/update/${1}`, {
    name: "개발이 취미인 사람",
  })

  //성공시 then 실행
  .then(function (response) {
    console.log(response);
  })

  //실패 시 catch 실행
  .catch(function (error) {
    console.log(error);
  });

//서버 소스 코드

//임시 데이터
const users = [
  { id: 1, name: "유저1" },
  { id: 2, name: "유저2" },
  { id: 3, name: "유저3" },
];

/**
 * @path {PUT} http://localhost:3000/api/users/update
 * @description 전체 데이터를 수정할 때 사용되는 Method
 */
app.put("/api/users/update", (req, res) => {
  // 구조분해를 통해 id 와 name을 추출
  const { id, name } = req.body;

  //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
  const user = users.map((data) => {
    if (data.id == id) data.name = name;

    return {
      id: data.id,
      name: data.name,
    };
  });

  res.json({ ok: true, users: user });
});

/**
 * @path {PATCH} http://localhost:3000/api/user/update/:user_id
 * @description 단일 데이터를 수정할 때 사용되는 Method
 */
app.patch("/api/user/update/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { name } = req.body;

  //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
  const user = users.map((data) => {
    if (data.id == user_id) data.name = name;

    return {
      id: data.id,
      name: data.name,
    };
  });

  res.json({ ok: true, users: user });
});
