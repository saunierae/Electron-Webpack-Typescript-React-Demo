import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import { Redirect, useHistory } from "react-router-dom";
import ToDoList, { ListItemData } from "./ToDo";
import getFileName from "./Files";

type JournalTemplateViewState = {items: ListItemData[]}
let name = 'createtodo';
let extension = '.json';

export class JournalTemplateView extends React.Component <{}, JournalTemplateViewState> {
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
        const history = useHistory();
      };

      handleClick() {
        return <Redirect to='/CreateSection'/>;
      }  
      
    render() {
        return (
            <div>
                <h1>Select Your Journal Template</h1>
                    {/* <button onClick={ this.openWin}>Open new window</button> */}
                    <p>Enter Journal Name</p>
                    <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem}></ToDoList>

                    <div>
                    <div className="center">
                        <button>View Tutorial</button>
                        <button className="loadList" onClick={this.loadList}>View Current Template</button>
                    </div>
                    <div className="centerRow2">
                    <button onClick={this.handleClick}>Add a Section</button>
                    {/* return <Redirect to='CreateSection'/> */}
                    <button>Delete Section</button>
                    </div>
                    <button className="saveList right-align" onClick={this.saveList}>Complete Journal Template</button>
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

