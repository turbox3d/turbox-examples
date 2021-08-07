import * as ReactDOM from "react-dom";
import * as React from "react";
import "antd/dist/antd.css";
import { store } from "./domain";
// import DemoBox from './component/index';
// import { Scene2DFront } from './2d';
import MainScene3D from "./3d/index";
import { config, Tolerance } from "@turbox3d/turbox3d";

config({
  middleware: {
    logger: false,
    perf: false
  }
  // devTool: process.env.NODE_ENV === 'development',
});
const TOLERANCE = 1e-3;
Tolerance.setGlobal(TOLERANCE, TOLERANCE, TOLERANCE);

store.document.createHistory(20);

store.document.applyHistory();

ReactDOM.render(
  <React.Fragment>
    {/* <DemoBox /> */}
    {/* <Scene2DFront /> */}
    <MainScene3D />
  </React.Fragment>,
  document.getElementById("root")
);
// import './benchmark';
