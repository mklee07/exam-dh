import React, { useState, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Home = () => {
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




    useEffect(() => {
        fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')  //해당 브라우저에 요청을 보냄
        .then((res) => res.json())      //응답받은 내용을 json으로 불러옴
        .then((json) => {               //받은 json에서의 data안의 movies를 setrowdata에 불러오고 json을 콘솔로그에 찍음.
          setRowData(json.data.movies);   
          console.log(json)
        });
        },[]);                          //첫 마운트에

    //fetch( url, [option] ) option에 아무것도 남기지 않으면 GET 메서드가 진행되어 url로부터 컨텐츠 진행. fetch안의 원격서버가 응답하면 .then 아래 코드가 실행됨.
    //.then(function(response){return response.json()})  //response.json() 응답을 JSON형태로 파싱함.



        //다른 방법
        //함수 앞에 async가 붙으면 해당 함수는 항상 프라미스를 반환함.
    // async function fetchFnc(){
    //     const json = await(
    //         await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')
    //     ).json();
    //      setMovie(json.data.movie)
    //      setLoading(false);
    // };
    // useEffect(getMovie,[]);
    // 사용이유 : 프라미스의 result 값을 좀 더 세련되게 얻음(JSON 형태가 아닌 TEXT형태로 받을수 있음). promise.then보다 가독성이 좋음.

    
   return (
       <div className="ag-theme-alpine" style={{height: 800, width: 800}}>
           <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection='multiple'
                onCellClicked={cellClickedListener}
           />
       </div>
   );
};

export default Home;