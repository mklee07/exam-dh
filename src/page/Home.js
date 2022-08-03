import React, { useState, useCallback, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const gridRef = useRef(); // sizeToFit에 이용됨 , useRef는 .current를 통해 useRef에 저장된 값에 접근할 수 있음.
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: "rating", resizable: true }, //ag-grid에서는 행에 필요한 속성들을 직접 행에 넣어 작동할 수 있도록함.resizeable은 옆의 선을 두어 크기를 맘대로 조절 가능
    { field: "year", resizable: true },
    { field: "title_english", resizable: true, headerName: "Title" },
    { field: "genres", resizable: true },
    { field: "runtime", resizable: true },
  ]);

  const cellClickedListener = useCallback((e) => {
    window.location.href = "/" + "movie" + "/" + e.data.id;
  }, []);

  const onClickNewData = (e) => {
    window.location.href = "/" + "movie" + "/" + 0;
  };

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

  // 하는일 : 행에 있는 data 값의 크게에 따라 열의 크기를 조절하는 함수
  // 아까워서 못지우겠음.
  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = []; //columnIds을 배열로 만듬

    // forEach를 for 모양으로 만듬.
    // for (id=0,id<colume ,id++){
    // allColumnIds.push(column[id].getId())
    // }
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId()); //값들을 리스트로 만든 allColumnIds에 푸쉬함. column.getId()로 열의 id값을 가져옴
      console.log(column.getId()); // 값들을 가져온것을 확인할 수 있음.
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    console.log(gridRef.current); //gridRef에 저장되어 있는 값에 접근
    console.log(gridRef.current.columnApi); //columnApi에 저장되어있는 getColumn함수를 사용하여 열의 값을 가져옴.
    console.log(gridRef.current.columnApi.getColumns()); //5개는 가져오지만 id값은 가져오지 못함.
    console.log(allColumnIds); //forEach함수로 id값을 가져와 배열에 값에 넣어진 것을 확인할 수 있음.
  });

  // const autoSizeAll = useCallback(function(skipHeader){
  //   return
  //     const allColumnIds = [];
  //     gridRef.current.columnApi.getColumns().forEach(function(column){
  //       return
  //         allColumnIds.push(column.getId());
  //     });
  //     gridRef.current.columnApi.autoSizeColumns(allColumnIds,skipHeader);
  // },[])

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

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        rowSelection="multiple"
        onCellDoubleClicked={cellClickedListener} //onCellClicked -> onCellDoubleClicked으로 바꿈
        enableCellTextSelection={true} //  사용시 아래의 ensureDomOrder을 같이 활용하는게 좋다고 본문에 설명이있음.
        ensureDomOrder={true} //본적으로 행과 열은 DOM에서 순서 없이 나타날 수 있고 '잘못된 순서'는 화면 판독기에서 구문 분석할 때 일관되지 않은 결과를 초래할 수 있음. 이를 방지하고자 행 및 열 순서를 강제 실행함.
        cacheQuickFilter={true}
      />
    </div>
  );
};

export default Home;

//https://yts.mx/api/v2/movie_details.json?movie_id=37384
//http://192.168.180.14:3000/movie/getMovies
