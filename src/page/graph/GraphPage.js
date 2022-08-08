import react, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AgChartsReact } from "ag-charts-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import qs from "qs";
import moment from "moment";

// const [id, setId] = useState();
const GraphPage = () => {
  const [strDate, setStrDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState();
  const [reply, setReply] = useState();
  const [rating, setRating] = useState();
  const [view, setView] = useState();
  const [id, setId] = useState();
  const [rowData, setRowData] = useState();

  useEffect(() => {
    axios(`http://192.168.180.14:3000/movie/getMovies`)
      .then((res) => res.data)
      .then((res) => {
        setRowData(res);
      });
  }, []);

  //format 변경
  function nowTime() {
    moment().format("YYYY-MM-DD");
  }

  const checkData = () => {
    axios
      .get(
        `http://192.168.180.14:3000/graph/getMovieGraph/id=${id}&strDate=${strDate}&endDate=${endDate}`
      )
      .then(function (res) {
        console.log("success");
      })
      .catch(function (error) {
        console.log("error");
      });
  };
  const onclickHome = useCallback((e) => {
    window.location.href = `/`;
  }, []);

  const selectStrDate = (e) => {
    nowTime(e);
    console.log(e);
  };

  const RatingGraph = {
    axes: [
      {
        type: "number",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
      },
    ],
    series: [
      {
        type: "histogram",
        xKey: "title",
        yKey: "rating",
      },
    ],
  };
  const viewGraph = {
    series: [
      {
        type: "pie",
        angleKey: "view",
        labelKey: "title",
      },
    ],
  };

  const replyGraph = {
    series: [
      {
        type: "pie",
        angleKey: "reply",
        labelKey: "title",
      },
    ],
  };

  const selectData = (e) => {
    setId(e.target.value);
  };
  return (
    <div className="Main">
      <div className="Header">
        <div className="table">
          <button style={{ float: "right" }} onClick={checkData}>
            조회
          </button>
          <button onClick={onclickHome} style={{ float: "right" }}>
            홈
          </button>

          <h3>제목</h3>
          <select style={{ width: "400px" }} onChange={selectData}>
            {rowData &&
              rowData.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.id}
                </option>
              ))}
          </select>
          <h3>시작일</h3>
          <Calendar value={strDate} onChange={selectStrDate} />
          <h3>종료일</h3>
          <Calendar value={endDate} />
        </div>
      </div>
      <div className="Body">
        <AgChartsReact options={RatingGraph} />
      </div>
      <div className="Footer">
        <AgChartsReact options={viewGraph} />
        <AgChartsReact options={replyGraph} />
      </div>
    </div>
  );
};

export default GraphPage;

//style={{ float: "right" }}
