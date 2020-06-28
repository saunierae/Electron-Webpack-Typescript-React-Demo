import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import {BrowserRouter, Route, Switch, Link, Redirect, withRouter} from "react-router-dom";
import ToDoList, { ListItemData } from "./ToDo";
import getFileName from "./Files";

type DisplayJournalState = {items: ListItemData[]}
let name = 'displayJournal';
let extension = '.json';

export class DisplayJournal extends React.Component <{}, DisplayJournalState> {
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
                <h1>Display Journal</h1>
                    {/* <button onClick={ this.openWin}>Open new window</button> */}
                    <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem}></ToDoList>

                    <div>
                    <button className="saveList" onClick={this.saveList}>Save</button>
                    <button className="loadList" onClick={this.loadList}>Load</button>
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

