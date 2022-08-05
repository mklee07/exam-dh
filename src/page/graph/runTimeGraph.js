// "use strict";

// import React, { useState } from "react";
// import { render } from "react-dom";
// import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
// import { AllModules } from "@ag-grid-enterprise/all-modules";
// import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
// import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css";

// const runTimeGraph = () => {
//   const [gridApi, setGridApi] = useState(null);
//   const [gridColumnApi, setGridColumnApi] = useState(null);
//   const [rowData, setRowData] = useState(null);

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     setGridColumnApi(params.columnApi);

//     const httpRequest = new XMLHttpRequest();
//     const updateData = (data) => {
//       setRowData(data);
//     };

//     httpRequest.open("GET", "http://192.168.180.14:3000/movie/getMovies");
//     httpRequest.send();
//     httpRequest.onreadystatechange = () => {
//       if (httpRequest.readyState === 4 && httpRequest.status === 200) {
//         updateData(JSON.parse(httpRequest.responseText));
//       }
//     };
//   };
//   //columns: ["age", "gold", "silver", "bronze"],
//   const onFirstDataRendered = (params) => {
//     var createRangeChartParams = {
//       cellRange: {
//         rowStartIndex: 0,
//         rowEndIndex: 99,
//         columns: ["year", "title", "runtime"],
//       },
//       chartType: "groupedColumn",
//       chartContainer: document.querySelector("#myChart"),
//       aggFunc: "sum",
//     };
//     params.api.createRangeChart(createRangeChartParams);
//   };

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       <div className="wrapper">
//         <div
//           id="myGrid"
//           style={{
//             height: "100%",
//             width: "100%",
//           }}
//           className="ag-theme-alpine"
//         >
//           <AgGridReact
//             modules={AllModules}
//             defaultColDef={{
//               editable: true,
//               sortable: true,
//               flex: 1,
//               minWidth: 100,
//               filter: true,
//               resizable: true,
//             }}
//             popupParent={document.body}
//             enableRangeSelection={true}
//             enableCharts={true}
//             chartThemeOverrides={{
//               common: {
//                 title: {
//                   enabled: true,
//                   text: "Movie Rating ",
//                 },
//                 legend: { position: "bottom" },
//               },
//               column: { axes: { category: { label: { rotation: 0 } } } },
//             }}
//             onGridReady={onGridReady}
//             onFirstDataRendered={onFirstDataRendered}
//             rowData={rowData}
//           >
//             <AgGridColumn field="title" width={150} chartDataType="category" />
//             <AgGridColumn field="year" chartDataType="category" sort="asc" />
//             <AgGridColumn field="sport" />
//             <AgGridColumn field="rating" chartDataType="excluded" />
//             <AgGridColumn field="runtime" chartDataType="series" />
//           </AgGridReact>
//         </div>
//         <div id="myChart" className="ag-theme-alpine my-chart"></div>
//       </div>
//     </div>
//   );
// };

// export default runTimeGraph;
