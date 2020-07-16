import * as React from "react";
import { HashRouter, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
import { ToDoList } from "./ToDo";
import { CreateSection } from "./CreateSection";
import { CreateLabel } from "./CreateLabel";
import { EditJournal } from "./EditJournal";
import { App } from "./App";
import CreateJournalTemplate from "./CreateJournalTemplate";
import { CreateQuestion } from "./CreateQuestion";
import Tutorial from "./Tutorial";
import { LabelCheck } from "./LabelCheck";
import { TotalSum } from "./TotalSumLabel";
import { DeleteSection } from "./DeleteSection";
import { DeleteJournal } from "./DeleteJournal";
import {ipcRenderer } from "electron";
import { AppState, 
  Section, 
  SectionItem, 
  Journal, 
  editJournalName, 
  addJournal, 
  deleteJournal, 
  editSectionName, 
  addSection, 
  deleteSection } from "./AppState";
import { windowsStore } from "process";

export class Routes extends React.Component <{}, AppState> {

  constructor(props) {
    super(props)
  
    this.state = 
      ipcRenderer.sendSync('read', "data.json")
  }

  editJournal = (id: number) => {
    window.location.hash="/EditJournal";
    window.location.search = "id=" + id;
  }

  editJournalName = (journalId: number, name: string) => {
    this.updateAppState(editJournalName(this.state, journalId, name))
  }

  addJournal = () => {
    this.updateAppState(addJournal(this.state, {name: "unnamed", sections: []}))
  }

  deleteJournal = (journalId: number) => {
    this.updateAppState(deleteJournal(this.state, journalId))
  }

  editSectionName = (journalId: number, sectionId: number, value: string) => {
    this.updateAppState(editSectionName(this.state, journalId, sectionId, value))
  }

  addSection = (journalId: number) => {
    this.updateAppState(addSection(this.state, journalId, {items: []}))
  }

  deleteSection = (journalId: number, sectionId: number) => {
    this.updateAppState(deleteSection(this.state, journalId, sectionId))
  }

  updateAppState = (state: AppState) => {
    ipcRenderer.sendSync('save', 'data.json', JSON.stringify({...this.state, ...state}))
    this.setState(state);
  }

  render() {
    const searchParams = new URLSearchParams(window.location.search);
    return (
      <div>
      <HashRouter>
          <Link to="/JournalTemplateView" className="button">Journal Template View</Link>
          <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
          <Link to="/CreateLabel" className="button">Create Label</Link>
          <Link to="/CreateSection" className="button">Create Section</Link>
          <Link to="/CreateQuestion" className="button">Create Question</Link>
          <Link to="/Tutorial" className="button">Tutorial</Link>
          <Link to="/LabelCheck" className="button">Label checkbox</Link>
          <Link to="/TotalSum" className="button">Total Sum Label</Link>
          <Link to="/DeleteSection" className="button">Delete Section</Link>
          <Link to="/DeleteJournal" className="button">Delete Journal</Link>
          <Link to="/EditJournal" className="button">Edit Journal</Link>
              <Switch>
                {/* <Route path="/JournalTemplateView"><JOJournal/></Route> */}
                <Route path="/EditJournal"><EditJournal
                journalID={parseInt(searchParams.get("id"))}                
                onUpdateName={this.editJournalName}
                journals={this.state.journals}
                 /></Route>
                <Route path="/CreateJournalTemplate"><CreateJournalTemplate 
                journals={this.state.journals} 
                addJournal={this.addJournal} 
                deleteJournal={this.deleteJournal}
                editJournal={this.editJournal}
                /></Route>
                <Route path="/CreateLabel"><CreateLabel/></Route>
                <Route path="/CreateSection"><CreateSection
                journalId={parseInt(searchParams.get("id"))}    
                addSection={this.addSection}
                deleteSection={this.deleteSection}           
                editSectionName={this.editSectionName}/>
                </Route>
                <Route path="/CreateQuestion"><CreateQuestion/></Route>
                <Route path="/Tutorial"><Tutorial/></Route>
                <Route path="/LabelCheck"><LabelCheck/></Route>
                <Route path="/TotalSum"><TotalSum/></Route>
                <Route path="/DeleteSection"><DeleteSection/></Route>
                <Route path="/DeleteJournal"><DeleteJournal/></Route>
              </Switch>
      </HashRouter>
      </div>
    )
  }
}