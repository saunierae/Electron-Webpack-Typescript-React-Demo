import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer} from "electron"; 

type ListItemData = {key: number, val: string}
type ToDoListState = {list: ListItemData[], userInput: string}

export class ToDoList extends React.Component <{},ToDoListState>{
  private nextID: number;

    constructor(props: {}) {
  
      super(props);
       this.nextID = 0;
        this.state = {
        userInput: '',
        list: []
      }
    }
  
    changeUserInput(input: string) {
      this.setState({
        userInput: input
      });
    }
  
    addToList(input: string) {
      if(input !== "") {
        let listArray = this.state.list
        const listItem = {key: this.nextID, val: input} 
        this.nextID++

        this.setState( { 
          list: [...this.state.list,listItem], 
          userInput: '' 
        })
      }
    }

    deleteItem = (key: number) => {
      const filteredItems= this.state.list.filter(item =>
        item.key!==key);
      this.setState({
        list: filteredItems
      }) 
    }

    // saveList = () {
    //   //check if file exist
    //   //create file if not
    //   //JSON.stringify(list)
    //  {this.state.list.map( (listItemData)}
    // }

    render() {
      return (
      <div className="to-do-list-main">
        <h1>ToDo</h1>
          <input
            onChange={ (input) => this.changeUserInput(input.target.value) }
            value={this.state.userInput}
            type="text"
            />
          <button onClick={ this.onAddListItem}>Add to List</button>
          <ul className="list" style={{flexDirection: 'row'}}>
            {this.state.list.map( (listItem) => <ListItem dataKey={listItem.key} val={listItem.val} key={listItem.key} deleteItem={this.deleteItem}/>)}
          </ul>
          {/* <button className="saveList" onClick={saveList}>Save</button> */}
          </div>
      );
    } 
    private onAddListItem = () => {this.addToList(this.state.userInput); ipcRenderer.send("save")} 
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