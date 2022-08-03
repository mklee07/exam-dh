import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { Button } from "react-bootstrap";

const Home = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: "rating", resizable: true, filter: "agNumberColumnFilter" }, //resizeable은 옆의 선을 두어 크기를 맘대로 조절 가능, filter는
    { field: "year", resizable: true, filter: "agNumberColumnFilter" },
    {
      field: "title",
      resizable: true,
      filter: "agSetColumnFilter",
    },
    { field: "genres", resizable: true, filter: "agSetColumnFilter" },
    { field: "runtime", resizable: true, filter: "agNumberColumnFilter" },
  ]);

  const cellClickedListener = useCallback((e) => {
    window.location.href = "/" + "movie" + "/" + e.data.id;
  }, []);

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onClickedHome = useCallback((e) => {
    window.location.href = `/`;
  }, []);

  // patch에서 axios로 변경.
  // fetch는 필요한 데이터가 JSON 데이터 포맷이 아니기 떄문에 응답 객체의 .json() 메서드로 호출함.
  // axios는 응답 데이터를 기본적으로 JSON 타입으로 사용할 수 있고 응답 데이터는 언제나 응답 객체의 data 프로퍼티에서 사용할 수 있음.
  useEffect(() => {
    axios
      .get("http://192.168.180.14:3000/movie/getMovies")
      .then((res) => res.data)
      .then((res) => {
        setRowData(res);
        console.log(res);
      });
  }, []);

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: 1920 }}>
      <div className="header" style={{ alignItems: "center" }}>
        <Button
          style={{ float: "left" }}
          type="button"
          class="btn btn-outline-primary"
          onClick={() => autoSizeAll(false)}
        >
          자동 정렬
        </Button>
        <Button
          style={{ float: "left" }}
          type="button"
          class="btn btn-outline-primary"
          onClick={sizeToFit}
        >
          셀 크기에 맞게 정렬
        </Button>
        <h3
          onClick={onClickedHome}
          style={{
            float: "left",
            paddingLeft: "10px",
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          Home
        </h3>
        <div class="input-group mb-3" style={{ width: "30%" }}>
          <input
            style={{ width: "40%" }}
            type="text"
            class="form-control"
            placeholder="검색할 내용"
          />
          <button
            class="btn btn-outline-secondary"
            style={{ float: "right" }}
            type="button"
            id="button-addon2"
          >
            검색
          </button>
        </div>
      </div>

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        rowSelection="multiple"
        onCellDoubleClicked={cellClickedListener} //onCellClicked -> onCellDoubleClicked으로 바꿈
        enableCellTextSelection={true} //  사용시 아래의 ensureDomOrder을 같이 활용하는게 좋다고 본문에 설명이있음.
        ensureDomOrder={true} //본적으로 행과 열은 DOM에서 순서 없이 나타날 수 있고 '잘못된 순서'는 화면 판독기에서 구문 분석할 때 일관되지 않은 결과를 초래할 수 있음. 행 및 열 순서를 강제 실행
      />
    </div>
  );
};

export default Home;

//https://yts.mx/api/v2/movie_details.json?movie_id=37384
//http://192.168.180.14:3000/movie/getMovies
//<h3 onClick={onClickedHome} style={{ float: "right" }}>
