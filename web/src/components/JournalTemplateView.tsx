import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import { Redirect, useHistory } from "react-router-dom";
import ToDoList, { ListItemData } from "./ToDo";
import getFileName from "./Files";
import Link from "react-router-dom";

type JournalTemplateViewState = {items: ListItemData[], nav: boolean, navDest: string}
let name = 'createtodo';
let extension = '.json';

export class JournalTemplateView extends React.Component <{}, JournalTemplateViewState> {
    private nextID: number = 0;

    constructor(props) {
        super(props)
    
        this.state = {
             items: [],
             nav: false,
             navDest: null,
        }
    }
    
    buildList (args) {
        console.log(args);
    }

    Item = () => {
        const history = useHistory();
      };

    handleClick = (destination) => {
        console.log("got into handleClick");
        this.setState({nav: true, navDest: destination});
        // history.pushState('/JournalTemplateView');
    }

    render() {
        if (this.state.nav) {  
            this.setState({nav: false});          
            return <Redirect to={this.state.navDest}/>
        }
        else {
            return (
                <div>
                    <h1>Select Your Journal Template</h1>
                        <p>Enter Journal Name</p>
                        <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem}></ToDoList>
                            <button className="center" onClick={e => this.handleClick('/Tutorial')}>View Tutorial</button>
                            <button className="loadList centerRow4" onClick={this.loadList}>View Current Template</button>
                            <button className="centerRow2" onClick={e => this.handleClick('/CreateSection')}>Add a Section</button>
                            <button className="centerRow3" onClick={e => this.handleClick('/DeleteSection')}>Delete Section</button>
                            <button className="centerRow5" onClick={this.saveList}>Complete Journal Template</button>
                            <button className="bottomRow" onClick={() => history.back()}>Back</button>
                </div>
            )
        }
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

