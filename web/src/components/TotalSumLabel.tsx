import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import ToDoList, { ListItemData } from "./ToDo";
import { fileURLToPath } from "url";
import getFileName from "./Files"

type TotalSumState = {items: ListItemData[]}
let name = 'totalSum';
let extension = '.json';


export class TotalSum extends React.Component <{}, TotalSumState> {
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
    render() {
        return (
            <div>
                <h1>Label Total Sum for Section</h1>
                    {/* <button onClick={ this.openWin}>Open new window</button> */}
                    <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem}></ToDoList>

                    <div>
                    <button className="saveList" onClick={this.saveList}>Complete</button>
                    <button className="loadList" onClick={this.loadList}>Load Preview</button>
                </div>
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