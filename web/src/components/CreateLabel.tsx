import * as React from "react";
import { useCallback } from "react";

type LabelItemData = {key: number, val: string}
type ListState = {list: LabelItemData[], userInput: string}

export class CreateLabel extends React.Component <{},ListState>{
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
    })}
  }

  deleteItem = (key: number) => {
    const filteredItems= this.state.list.filter(item =>
      item.key!==key);
    this.setState({
      list: filteredItems
    }) 
  }

  render() {
    return (
      <div className="create-label-list-main">
        <h1>Create Label</h1>
        <p/>
          <p>Please enter the label items for each of the labels created starting in order with the first label </p>
          <div>
            <input
              onChange={ (e) => this.changeUserInput(e.target.value) }
              value={this.state.userInput}
              type="text"
              />
              <button onClick={ () => this.addToList(this.state.userInput) }>enter</button>
            </div>
          <ul className="list">
            {this.state.list.map( (listItem) => <LabelItem dataKey={listItem.key} val={listItem.val} key={listItem.key} deleteItem={this.deleteItem}/>)}
          </ul>
          {/* <button onClick={saveList}>Save</button> */}
          </div>
    );
  }
}

type LabelItemProps = LabelItemData& {deleteItem: (key: number) => void, dataKey: number}
const LabelItem = (props: LabelItemProps) => {
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