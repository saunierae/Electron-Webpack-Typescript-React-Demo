import * as React from "react";
import {App} from "./components/App";
//import {CreateLabel} from "./components/CreateLabel";
//import {CreateQuestion} from "./components/CreateQuestion"
//import {CreateSection} from "./components/CreateSection"
import {render} from "react-dom";
import {Routes} from "./components/Routes"
import {ToDoList} from "./components/ToDo";
import Tutorial from "./components/Tutorial";
//import { DisplayJournal } from "./components/DisplayJournal";
//import { BrowserRouter, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";

const rootEl = document.getElementById("root");

render(
    // <App/>,
    <>    
    <div>{""}</div>
    <Routes/>
    {/* <DisplayJournal/> */}
    {/* <CreateLabel/>
    <ToDoList/>
    <Tutorial/>
    <CreateQuestion/>
    <CreateSection/> */}
    </>,
    rootEl,
);

