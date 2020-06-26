import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer} from "electron";
import PropTypes from 'prop-types'
import {BrowserRouter, Route, Switch, Link, Redirect, withRouter} from "react-router-dom";

export type ListItemData = {key: number, val: string}
type ToDoListState = {userInput: string}
type ToDoListProps = {list: ListItemData[], addToList: (input: string) => void, deleteItem: (key: number) => void}

export class ToDoList extends React.Component <ToDoListProps,ToDoListState>{

    constructor(props: ToDoListProps) {
  
      super(props);
        this.state = {
        userInput: ''
      }
    }
  
    changeUserInput(input: string) {
      this.setState({
        userInput: input
      });
    }
  
    addToList(input: string) {
      if(input !== "") {
        this.props.addToList(input)
      }
    }

    deleteItem = (key: number) => {
      this.props.deleteItem(key)
    }

    render() {
      return (
      <div className="to-do-list-main">
        <div className="input">
          <input 
            onChange={ (input) => this.changeUserInput(input.target.value) }
            value={this.state.userInput}
            type="text"
            />
          <button onClick={ this.onAddListItem}>Enter</button>
          </div>
          <ul className="list" style={{flexDirection: 'row'}}>
            {this.props.list.map( (listItem) => 
              <ListItem dataKey={listItem.key} 
              val={listItem.val} key={listItem.key} 
              deleteItem={this.deleteItem}/>
            )}
          </ul>
          </div>
      );
    } 
    private onAddListItem = () => {
      this.addToList(this.state.userInput);
    }
  }

type ListItemProps = ListItemData& {deleteItem: (key: number) => void, dataKey: number}
const ListItem = (props: ListItemProps) => {
  const onClick = useCallback(
    () => {
      props.deleteItem(props.dataKey)
    },
    [props],
  )
  return (
    <>
      <li>{props.val}</li>
      <button onClick={onClick}>Delete</button>
    </>
  )
}

export default ToDoList;