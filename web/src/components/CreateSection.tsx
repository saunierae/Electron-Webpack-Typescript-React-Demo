import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import { useHistory } from "react-router-dom";
import { ipcRenderer } from "electron";
import {Section, SectionItem} from './AppState';

type CreateSectionProps = {
  journalId: number,
  value: string, 
  sectionId: number,
  addSection: (id: number, sectionInfo: Section) => void,
  deleteSection: (journalId: number, sectionId) => void,
  editSectionName: (journalId: number, sectionId: number, value: string) => void
}
// interface CreateSectionState {selectedOption: string, userInput : number, value: string}

export class CreateSection extends React.Component <CreateSectionProps>{ //, CreateSectionState>{
  constructor(props) {
    super(props)
  
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    console.log('state changed');
  }

  handleSubmit = (event) => {
    alert('Selection ');
    event.preventDefault();
  }
    
  changeUserInput = (input: number) => {
    this.setState({
      userInput: input
    });
  }
    
  addToList = (input: number) => {
    if(input !== 0 && input > 0) {

      this.setState( { 
        userInput: input
      })
    }
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    //console.log("You have submitted:", this.state.selectedOption);
  };

    Item = () => {
    let history = useHistory();
  };
  render() {
    return (
      <div>
        <h1>Create Section for Journal</h1>  
        <p>Select Labels or Questions for your section:</p>
          <form onSubmit={this.handleSubmit}>
            <label>
            <select id="type" value={this.props.value} onChange={this.handleChange}>
              <option value="question">Question</option>
              <option value="label">Label</option>
            </select>
            </label>
          </form>
        {/* <form onSubmit={this.handleFormSubmit}>
            <div className="form-check1">
              <label>
                <input
                  type="radio"
                  name="group-1"
                  value="question"
                  checked={this.state.selectedOption === "question"}
                  onChange={this.handleOptionChange}
                  className="form-check-input-1"
                />
                Question
              </label>
            </div>
            <div className="form-check1">
              <label>
                <input
                  type="radio"
                  name="group-1"
                  value="label"
                  checked={this.state.selectedOption === "la bel"}
                  onChange={this.handleOptionChange}
                  className="form-check-input-1"
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
          </div> */}

        <h2>Section Name:</h2>
        <input
          type="text"
          onChange={ (input) => this.props.setSectionName(this.props.sectionId, input.target.value)}
          // value={this.state.userInput}
          />
        <p>Select the type of input that you would like to add:</p>
        <div>
            <form onSubmit={this.handleFormSubmit} id="2">
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="group-2"
                  value="text"
                  //checked={this.state.selectedOption === "text"}
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
                  name="group-2"
                  value="radiobtn"
                  //checked={this.state.selectedOption === "radiobtn"}
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
                  name="group-2"
                  value="checkbox"
                  //checked={this.state.selectedOption === "checkbox"}
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
                  name="group-2"
                  value="timestamp"
                  //checked={this.state.selectedOption === "timestamp"}
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
                  name="group-2"
                  value="total"
                  //checked={this.state.selectedOption === "total"}
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
                  name="group-2"
                  value="todo"
                  //checked={this.state.selectedOption === "todo"}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                To Do List
              </label>
            </div>
            <div className="form-group-2">
              <p></p>
              {/* <button className="saveList right-align" type="submit" onClick={this.generateItems}>
                Complete Section
              </button> */}
            </div>
          </form>
          </div>
      <button className="bottomRow" onClick={() => history.back()}>Back</button>
      </div>
  )
}
}





