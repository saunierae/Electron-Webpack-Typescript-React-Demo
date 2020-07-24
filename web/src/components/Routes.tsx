import * as React from "react";
import { HashRouter, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
import { ToDoList } from "./ToDo";
import { CreateSection } from "./CreateSection";
import { EditJournalForm } from "./EditJournalForm";
import CreateJournalTemplate from "./CreateJournalTemplate";
import Tutorial from "./Tutorial";
import { TotalSum } from "./TotalSumLabel";
import { ipcRenderer } from "electron";
import {
  AppState,
  Section,
  SectionItem,
  Journal,
  editJournalName,
  addJournal,
  deleteJournal,
  editItemName,
  editSectionName,
  addSection,
  deleteSection,
  deleteItem,
  addItem
} from "./AppState";
import { windowsStore } from "process";

export class Routes extends React.Component<{}, AppState> {

  constructor(props) {
    super(props)

    this.state =
      ipcRenderer.sendSync('read', "data.json")
  }

  editJournal = (journalId: number) => {
    var test = this.state
    window.location.hash = "/EditJournal";
    window.location.search = "id=" + journalId;
    this.forceUpdate();
  }

  addJournal = () => {
    this.updateAppState(addJournal(this.state, { name: "Name Journal", sections: [] }))
  }

  editJournalName = (journalId: number, name: string) => {
    this.updateAppState(editJournalName(this.state, journalId, name))
  }

  deleteJournal = (journalId: number) => {
    this.updateAppState(deleteJournal(this.state, journalId))
  }

  editItemName = (journalId: number, sectionId: number, itemId: number, value: string) => {
    this.updateAppState(editItemName(this.state, journalId, sectionId, itemId, value))
  }

  editSectionName = (journalId: number, sectionId: number, name: string) => {
    this.updateAppState(editSectionName(this.state, journalId, sectionId, name))
  }

  addSection = (journalId: number) => {
    this.updateAppState(addSection(this.state, journalId, {name: "Name Section", itemType: "freeform", items: [] }))
  }

  addItem = (journalId: number, sectionId: number) => {
    this.updateAppState(addItem(this.state, journalId, sectionId, { label: "unnamed" }))
  }

  deleteSection = (journalId: number, sectionId: number) => {
    this.updateAppState(deleteSection(this.state, journalId, sectionId))
  }

  deleteItem = (journalId: number, sectionId: number, itemId: number) => {
    this.updateAppState(deleteItem(this.state, journalId, sectionId, itemId))
  }

  updateAppState = (state: AppState) => {
    ipcRenderer.sendSync('save', ['data.json', JSON.stringify({ ...this.state, ...state })])
    this.setState(state);
  }

  render() {
    const searchParams = new URLSearchParams(window.location.search);
    const journalId = parseInt(searchParams.get("id"));
    const sectionId = parseInt(searchParams.get("id"));
    const itemId = parseInt(searchParams.get("id"));
    const editJournalForm = !isNaN(journalId) && !isNaN(sectionId) && !isNaN(itemId) ? <EditJournalForm
    journal={this.state.journals[journalId]}
    journalId={journalId}
    sectionId={sectionId}
    itemId={itemId}
    addSection={this.addSection}
    additem={this.addItem}
    deleteSection={this.deleteSection}
    editSectionName={this.editSectionName}
    editItemName={this.editItemName}
    deleteItem={this.deleteItem}
  /> : null; 

    const createJournalTemplate = !isNaN(journalId) ? <CreateJournalTemplate
    journals={this.state.journals}
    journal={this.state.journals[journalId]}
    journalId={journalId}
    addJournal={this.addJournal}
    deleteJournal={this.deleteJournal}
    editJournal={this.editJournal}
    editJournalName={this.editJournalName}
  /> : null; 
    return (
      <div>
        <HashRouter>
          <Link to="/JournalTemplateView" className="button">Journal Template View</Link>
          <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
          <Link to="/Tutorial" className="button">Tutorial</Link>
          <Link to="/TotalSum" className="button">Total Sum Label</Link>
          <Link to="/EditJournalForm" className="button">Edit Journal</Link>
          <Switch>
            {/* <Route path="/JournalTemplateView"><JOJournal/></Route> */}
            <Route path="/EditJournalForm">{editJournalForm}</Route>
            <Route path="/CreateJournalTemplate">
              {/* {createJournalTemplate} */}
              <CreateJournalTemplate
                journals={this.state.journals}
                journal={this.state.journals[journalId]}
                journalId={journalId}
                addJournal={this.addJournal}
                deleteJournal={this.deleteJournal}
                editJournal={this.editJournal}
                editJournalName={this.editJournalName}
            />
            </Route>
            {/* <Route path="/CreateSection"><CreateSection
                journalId={parseInt(searchParams.get("id"))}    
                addSection={this.addSection}
                deleteSection={this.deleteSection}           
                /></Route> */}
            <Route path="/Tutorial"><Tutorial /></Route>
            <Route path="/TotalSum"><TotalSum /></Route>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}