import * as React from "react";
import { useCallback } from "react";

type QuestionItemData = {key: number, val: string}
type ListState = {list: QuestionItemData[], userInput: string}

export class CreateQuestion extends React.Component <{},ListState>{
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
      <div className="create-question-list-main">
        <h1>Create Question</h1>
        <p/>
          <p>Please enter the questions for each number of questions starting in order with the first question </p>
          <div>
            <input
              onChange={ (e) => this.changeUserInput(e.target.value) }
              value={this.state.userInput}
              type="text"
              />
              <button onClick={ () => this.addToList(this.state.userInput) }>enter</button>
            </div>
          <ul className="list">
            {this.state.list.map( (listItem) => <QuestionItem dataKey={listItem.key} val={listItem.val} key={listItem.key} deleteItem={this.deleteItem}/>)}
          </ul>
          {/* <button onClick={saveList}>Save</button> */}
          </div>
    );
  }
}

type QuestionItemProps = QuestionItemData& {deleteItem: (key: number) => void, dataKey: number}
const QuestionItem = (props: QuestionItemProps) => {
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