import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import ToDoList, { ListItemData } from "./ToDo";
import getFileName from "./Files";
import { useHistory } from "react-router-dom";

type CreateLabelState = {items: ListItemData[]}
let name = 'createLabel';
let extension = '.json';

export class CreateLabel extends React.Component <{}, CreateLabelState> {
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
                <h1>Create Label</h1>
                Type in the label name beginning with the first label. 
                    {/* <button onClick={ this.openWin}>Open new window</button> */}
                    <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem}></ToDoList>
                    <button className="saveList centerRow2" onClick={this.saveList}>Complete</button>
                    <button className="centerRow3 loadList" onClick={this.loadList}>Load Preview</button>
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
            ipcRenderer.send("save", [getFileName(name, extension),sendString]);
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