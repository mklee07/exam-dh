import React, { useState, useCallback, useEffect, useReducer} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';



const Home = () => {
    axios.get('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')
   const [users, setUsers] = useState();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
 
   const fetchUsers = async () => {
     try {
       // 요청이 시작 할 때에는 error 와 users 를 초기화하고
       setError(null);
       setUsers(null);
       // loading 상태를 true 로 바꿉니다.
       setLoading(true);
       const response = await axios.get(
         'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year'
       );
       setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
     } catch (e) {
       setError(e);
     }
     setLoading(false);
   };
   useEffect(()=>{
    fetchUsers();
    console.log(users)
   },[])


   const [rowData,setRowData] = useState([])
   // var dataState = useState([])
   // var rowData = dataState[0]
   // var setData = dataState[1]
   // setRowData가 밑의 json data의 movies에서 데이터 값을 가져옴.
  const [columnDefs] = useState([
       { field: 'rating' },
       { field: 'id' },
       { field: 'title' }
  ])
    //자주 사용됨을써 usecallback을 사용해 최적화함.
    //useCallback은 함수를 재사용하는 hooks.

    const cellClickedListener = useCallback(e => {
        window.location.href = "/" + "movie" + "/" + e.data.id;
    }, []);
    // const cellClickedListener = useCallback( function (e){return {window.location.href = "/"+ "movie" + "/" + e.data.id}} )
    // 버튼이 클릭 될 때마다 useCallback이 작동하여 함수를 재사용함.
    // window.location.href는 페이지 이동


    
   return (
       <div className="ag-theme-alpine" style={{height: 800, width: 800}}>
           <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection='multiple'
                onCellDoubleClicked={cellClickedListener} //onCellClicked -> onCellDoubleClicked으로 바꿈
                enableCellTextSelection={true} //사용시 아래의 ensureDomOrder을 같이 활용하는게 좋다고 본문에 설명이있음.
                ensureDomOrder={true}  //본적으로 행과 열은 DOM에서 순서 없이 나타날 수 있고 '잘못된 순서'는 화면 판독기에서 구문 분석할 때 일관되지 않은 결과를 초래할 수 있음. 행 및 열 순서를 강제 실행
           />
       </div>
   );
};

export default Home;