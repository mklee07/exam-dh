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
import { render } from "react-dom";
import { Button } from "react-bootstrap";
import "./Home.css";
//GRAPH
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
//GRAPH
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

const Home = () => {
  const gridRef = useRef(); // useRef는 .current를 통해 저장된 값에 접근할 수 있음.
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: "rating", resizable: true, chartDataType: "category" },
    { field: "year", resizable: true, chartDataType: "excluded" },
    {
      field: "title",
      resizable: true,
      headerName: "title",
      cellStyle: {
        textOverflow: "ellipsis", //  ...을 만듬
        whiteSpace: "nowrap", //아랫줄로 내려가는 것을 막음
        overflow: "hidden", // 영역 감추기
        padding: 0,
      },
    },
    { field: "genres", resizable: true },
    { field: "runtime", resizable: true, chartDataType: "series" },
  ]);

  const onClickNewData = (e) => {
    window.location.href = "/" + "movie" + "/" + 0;
  };
  const onClickGraphpage = (e) => {
    window.location.href = "/" + "graph" + "/" + "getMovieGraph";
  };
  const cellClickedListener = useCallback((e) => {
    window.location.href = "/" + "movie" + "/" + e.data.id;
  }, []);

  // 하는일 : 열에 있는 셀의 크기에 따라 열의 크기를 재조정해주는 함수
  // 자주 사용함으로 usecallback(함수를 재사용함)를 사용함
  // useCallback(fn, deps) = useMemo(()=> fn , deps)
  // []의 값 , 즉 기억된 버전은 콜백의 의존성이 변경되었을 때만 변경됨.(불필요한 랜더링 방지 원래는 [a,b] 처럼 사용됨. useEffect와 혼동하지 말 것)
  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  //홈 불러오기를 함수화
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
        sizeToFit();
      });
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const onPrintQuickFilterTexts = useCallback(() => {
    gridRef.current.api.forEachNode(function (rowNode, index) {
      console.log(
        "Row " +
          index +
          " quick filter text is " +
          rowNode.quickFilterAggregateText
      );
    });
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: 1900 }}>
      <div className="header">
        <h3
          onClick={onClickedHome}
          style={{
            textAlign: "center",
            paddingLeft: "10px",
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          Home
        </h3>

        <div style={{ textAlign: "right" }}>
          <div>
            <input
              id="filter-text-box"
              style={{ textAlign: "right" }}
              type="text"
              class="form-control"
              onInput={onFilterTextBoxChanged}
              placeholder="내용을 적으면 자동으로 검색이 됩니다."
            />
          </div>
          <Button
            variant="outline-secondary"
            style={{}}
            type="button"
            onClick={onClickGraphpage}
          >
            그래프
          </Button>
          <Button
            variant="outline-secondary"
            style={{}}
            type="button"
            onClick={onClickNewData}
          >
            신규
          </Button>
          <Button
            variant="outline-secondary"
            style={{}}
            type="button"
            onClick={onPrintQuickFilterTexts}
          ></Button>
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: 1920 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onCellDoubleClicked={cellClickedListener} //onCellClicked -> onCellDoubleClicked으로 바꿈
          enableCellTextSelection={true} //  사용시 아래의 ensureDomOrder을 같이 활용하는게 좋다고 본문에 설명이있음.
          ensureDomOrder={true} //본적으로 행과 열은 DOM에서 순서 없이 나타날 수 있고 '잘못된 순서'는 화면 판독기에서 구문 분석할 때 일관되지 않은 결과를 초래할 수 있음. 이를 방지하고자 행 및 열 순서를 강제 실행함.
          cacheQuickFilter={true}
        />
      </div>
      <div className="ag-theme-alpine my-chart"></div>
    </div>
  );
};

export default Home;

//https://yts.mx/api/v2/movie_details.json?movie_id=37384
//http://192.168.180.14:3000/movie/getMovies

// http://192.168.180.14:3000/graph/getMovieGraph?id=1&strDate=2022-01-01&endDate=2022-01-31
// http://192.168.180.14:3000/graph/getMovieGraph?id=3&strDate=undefined&endDate=Fri
