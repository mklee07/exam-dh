import react, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AgChartsReact } from "ag-charts-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./GraphPage.css";

// const [id, setId] = useState();
const GraphPage = () => {
  const [strDate, setStrDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [reply, setReply] = useState([]);
  const [rating, setRating] = useState([]);
  const [view, setView] = useState([]);
  const [id, setId] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rowData, setRowData] = useState();
  const [endRowData, setEndRowData] = useState();
  const [newDate, setNewDate] = useState(new Date());

  useEffect(() => {
    axios(`http://192.168.180.14:3000/movie/getMovies`)
      .then((res) => res.data)
      .then((res) => {
        setRowData(res);
      });
  }, []);

  const checkData = () => {
    // id=1일떄 1번을 아무리 눌러도 값이 안나옴. 그걸 방지하기 위해.
    if (id === "0") {
      alert("제목을 선택하세요");
    }
    //url을 쉽게 자주 사용하기 위해 선언
    const param = `http://192.168.180.14:3000/graph/getMovieGraph?id=${id}&strDate=${strDate}&endDate=${lastDate}`;
    console.log(param);
    axios
      .get(param)
      .then((res) => {
        setEndRowData(res.data);
        setView(res.data);
        setReply(res.data);
        setRating(res.data);
        setNewDate(res.data);
        console.log("endRowData", endRowData); //oo
        console.log("view", view);
        console.log("reply", reply); //oo
        console.log("rating", rating);
        console.log("setNewDate", newDate);
      })
      .catch(function (error) {
        console.log("error22");
      });
  };
  const onclickHome = useCallback((e) => {
    window.location.href = `/`;
  }, []);

  const RatingGraph = {
    theme: "ag-default",
    data: endRowData,
    axes: [
      {
        type: "number",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        nice: true,
        label: {
          fontStyle: "italic",
        },
      },
    ],
    series: [
      {
        type: "scatter",
        xKey: "id",
        yKey: "rating_number",
      },
    ],
    padding: {
      left: 0,
      top: 40,
      right: 40,
      bottom: 40,
    },
  };

  const viewGraph = {
    data: endRowData,
    series: [
      {
        type: "pie",
        labelKey: "id", //genre로 바꿀 예정
        angleKey: "view_number", //view_number로 바꿀 예정
        innerRadiusOffset: -70,
      },
    ],
  };

  const replyGraph = {
    data: endRowData,
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        nice: true,
        label: {
          fontStyle: "italic",
        },
      },
    ],
    series: [
      {
        type: "column",
        xKey: "date",
        yKey: "reply_number",
      },
    ],
  };
  const onchangeStartDate = (e) => {
    console.log(startDate);
    setStartDate(e); //Datepicker에서 변수를 Date로 인식해야만 작동하기에 setStartDate의 이벤트 작동할 때의 값을 가져와 사용.
    setStrDate(moment(e).format("YYYY-MM-DD"));
  };
  const onchangeEndDate = (e) => {
    console.log(endDate);
    setEndDate(e);
    setLastDate(moment(e).format("YYYY-MM-DD"));
  };

  return (
    <div className="Main">
      <table>
        <thead>
          <tr>
            <td>제목</td>
            <select
              id={"selectBox"}
              style={{ width: "400px" }}
              onChange={(e) => {
                setId(e.target.value);
              }}
            >
              <option value={0} key={0}>
                선택하세요
              </option>
              {rowData &&
                rowData.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.id}
                  </option>
                ))}
            </select>
            <td>시작일</td>
            <DatePicker
              selected={startDate}
              onChange={onchangeStartDate}
              dateFormat="yyyy-MM-dd"
            />
            <td>종료일</td>
            <DatePicker
              selected={endDate}
              onChange={onchangeEndDate}
              dateFormat="yyyy-MM-dd"
            />
            <td>
              <button style={{ float: "right" }} onClick={checkData}>
                조회
              </button>
              <button onClick={onclickHome} style={{ float: "right" }}>
                홈
              </button>
            </td>
          </tr>
        </thead>
      </table>

      <div className="Body">
        <h3>rating</h3>
        <h6>전체량 : {rating.length}</h6>
        {/* <h6>10 : {(rating > 9).length}</h6> */}
        <AgChartsReact options={RatingGraph} />
      </div>
      <div className="Footer">
        <h3>genre</h3>
        <AgChartsReact options={viewGraph} />
        <h3>reply</h3>
        <h6>date: {}</h6>
        <AgChartsReact options={replyGraph} />
      </div>
    </div>
  );
};

export default GraphPage;

//style={{ float: "right" }}
// 뭔가가 잘 안될떄는 0값을 대입하여 값을 만든후 map으로

// {
//   rowData.labels && Object.keys(rowData.labels).map((label, idx) => {
//       let key = label;
//       let value = rowData.labels[key];
//       return `ㆍ ${key} = ${value}\n`;
//   })
// }
