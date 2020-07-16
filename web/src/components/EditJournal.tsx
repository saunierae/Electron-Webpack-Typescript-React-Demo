import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer, BrowserView, BrowserWindow} from "electron";
import { Redirect, useHistory } from "react-router-dom";
import ToDoList, { ListItemData } from "./ToDo";
import getFileName from "./Files";
import Link from "react-router-dom";
import { Journal } from "./AppState";

type EditJournalProps = {
    journalID: number,    
    journals: Journal[],
    onUpdateName: (id: number, value: string) => void
}

export class EditJournal extends React.Component <EditJournalProps> {
    private nextID: number = 0;

    onUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onUpdateName(this.props.journalID, e.target.value);
    }

    render() {
            return (
                <div>
                    <h1>Select Your Journal Template</h1>
                        <p>Enter Journal Name</p>
                        <input onChange={this.onUpdateName}></input>
                        {/* <ToDoList list = {this.state.items} addToList = {this.addToList} deleteItem = {this.deleteItem}></ToDoList>
                            <button className="center" onClick={e => this.handleClick('/Tutorial')}>View Tutorial</button>
                            <button className="loadList centerRow4" onClick={this.loadList}>View Current Template</button>
                            <button className="centerRow2" onClick={e => this.handleClick('/CreateSection')}>Add a Section</button>
                            <button className="centerRow3" onClick={e => this.handleClick('/DeleteSection')}>Delete Section</button>
                            <button className="centerRow5" onClick={this.saveList}>Complete Journal Template</button>
                            <button className="bottomRow" onClick={() => history.back()}>Back</button> */}
                </div>
            )
        }
    }

