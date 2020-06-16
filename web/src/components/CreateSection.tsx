import * as React from "react";
import { useCallback } from "react";
import './Styles.css';

interface CreateSectionProps {}
interface CreateSectionState {selectedOption: string, userInput : number}


export class CreateSection extends React.Component <CreateSectionProps, CreateSectionState>{
    constructor(props) {
        super(props);
          this.state = {
          userInput: 0,
          selectedOption: "option1"
        };
      }
    
      changeUserInput(input: number) {
        this.setState({
          userInput: input
        });
      }
    
      addToList(input: number) {
        if(input !== 0) {
  
          this.setState( { 
            userInput: input
          })
        }
      }

      handleOptionChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
      };

      handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    
        console.log("You have submitted:", this.state.selectedOption);
      };

    render() {
      return (
        <div>
          <h1>Create Section for Journal</h1>  
          <p></p>
          <form onSubmit={this.handleFormSubmit}>
              <div className="form-check1">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="question"
                    checked={this.state.selectedOption === "question"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Question
                </label>
              </div>
              <div className="form-check1">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="label"
                    checked={this.state.selectedOption === "label"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Label
                </label>
              </div>
              <div className="form-group1">
                <button className="btn1 btn-primary mt-2" type="submit">
                  Save
                </button>
              </div>
            </form>
          <p>Enter in the number of questions or labels you would like to add for this series</p>
          <input
            type="number"
            pattern="[0-9]*"
            onChange={ (input) => this.changeUserInput(parseInt(input.target.value))}
            // value={this.state.userInput}
            />
          {/* <button onClick={ () => this.addToList(this.state.userInput) }>Add to List</button> */}
          <p>Select the type of input that you would like to add:</p>
             <form onSubmit={this.handleFormSubmit}>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="text"
                    checked={this.state.selectedOption === "text"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Text
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="radiobtn"
                    checked={this.state.selectedOption === "radiobtn"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Radio Button
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="checkbox"
                    checked={this.state.selectedOption === "checkbox"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Check Box
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="timestamp"
                    checked={this.state.selectedOption === "timestamp"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Time Stamp
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="total"
                    checked={this.state.selectedOption === "total"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Total Sum and Input Boxes
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="react-tips"
                    value="todo"
                    checked={this.state.selectedOption === "todo"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  To Do List
                </label>
              </div>
              <div className="form-group">
                <button className="btn btn-primary mt-2" type="submit">
                  Save
                </button>
              </div>
            </form>
        </div>
    )
}
}


