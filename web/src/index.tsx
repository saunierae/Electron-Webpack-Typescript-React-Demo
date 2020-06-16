import * as React from "react";
import {App} from "./components/App";
import {CreateLabel} from "./components/CreateLabel";
import {CreateQuestion} from "./components/CreateQuestion"
import {CreateSection} from "./components/CreateSection"
import {render} from "react-dom";
import {ToDoList} from "./components/ToDo";
import Tutorial from "./components/Tutorial";

const electron = require('electron')

const {app, BrowserWindow, ipcMain: ipc } = electron

const rootEl = document.getElementById("root");
render(
    // <App/>,
    <>    
    <div>{""}</div>
    <CreateLabel/>
    <ToDoList/>
    <Tutorial/>
    <CreateQuestion/>
    <CreateSection/>
    </>,
    rootEl,
);
