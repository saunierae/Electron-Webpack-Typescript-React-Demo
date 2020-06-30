import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import { useHistory } from "react-router-dom";
import ToDoList, { ListItemData } from "./ToDo";
import getFileName from "./Files";

type LabelCheckState = {items: ListItemData[]}
let name = 'labelCheck';
let extension = '.json';

export class LabelCheck extends React.Component <{}, LabelCheckState> {
    private nextID: number = 0;

    constructor(props) {
        super(props)
    
        this.state = {
             items: []     
        }
    }
    

    buildList (args) {
        console.log(args);
    }

    Item = () => {
        let history = useHistory();
      };

    render() {
        return (
            <div>
                <h1>Label checkbox / radio buttons for section</h1>
                    {/* <button onClick={ this.openWin}>Open new window</button> */}
                    <div>
                    <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem} ></ToDoList>
                    <div>
                    </div>
                    <button className="saveList" onClick={this.saveList}>Complete</button>
                    <button className="loadList" onClick={this.loadList}>Load Preview</button>
                </div>
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }

        private loadList = () => {
            var data = ipcRenderer.sendSync('read', getFileName(name, extension))
            console.log("private display: " + data)
            this.setState({items: JSON.parse(data)})
        };

        private saveList = () => {
            var sendString = JSON.stringify(this.state.items);
            console.log(sendString);      
            ipcRenderer.send("save", [getFileName(name, extension) ,sendString]);
          }

          addToList = (val: string) => {
                this.setState({
                    items: [...this.state.items, {val, key:this.nextID++}]
                })
          }

          deleteItem = (key: number) => {
                this.setState({
                    items: this.state.items.filter(item => item.key !== key)  
                })
          }
    }

