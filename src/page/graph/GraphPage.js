import react, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import runTimeGraph from "./runTimeGraph";

const GraphPage = () => {
  useEffect(() => {
    axios(`http://192.168.180.14:3000/movie/getDetail?id=${id}/graph`)
      .then((res) => res.data)
      .then((res) => {
        setDescription(res.description_full);
        setTitle(res.title);
        setYear(res.year);
        setRating(res.rating);
        setGenres(res.genres);
        setRuntime(res.runtime);
        setMovie(res);
        console.log(id);
        console.log(hidden);
      });
  }, []);
  return <runTimeGraph />;
};

export default GraphPage;
