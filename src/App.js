import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./page/Detail";
import GraphPage from "./page/graph/GraphPage";
import Home from "./page/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/" element={<Home />} />
          <Route path="/graph/getMovieGraph" element={<GraphPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
