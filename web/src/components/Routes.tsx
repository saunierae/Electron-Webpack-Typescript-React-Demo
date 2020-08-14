import * as React from "react";
import { HashRouter, Redirect, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
import { JournalEntriesListComponent } from "./JournalEntriesListComponent"
import { EditJournalTemplateComponent } from "./EditJournalTemplateComponent";
import JournalTemplateListComponent from "./JournalTemplateListComponent";
import Tutorial from "./Tutorial";
import { ipcRenderer } from "electron";
import {
  AppState,
  editJournalName,
  JournalEntry,
  ItemEntry,
  addJournal,
  deleteJournal,
  editItemName,
  editSectionName,
  addSection,
  deleteSection,
  deleteItem,
  addItem,
  ItemType,
  finalizeJournal,
  addJournalEntry,
  updateEntryValue,
  deleteEntry
} from "./AppState";
import JournalEntryComponent from "./EditJournalEntryComponent";
type RoutesState = { appState: AppState, journalId?: number, entryId?: number, }

export class Routes extends React.Component<{}, RoutesState> {

  constructor(props) {
    super(props)

    this.state ={
      appState: ipcRenderer.sendSync('read', "data.json")
    }
  }

  // State for adding a journal
  addJournal = () => {
    this.updateAppState(addJournal(this.state.appState, { name: "Name Journal", sections: [], finalized: false, journalEntries: [] }))
  }

  // State for adding a journal entry
  addJournalEntry = (journalId: number, entry: JournalEntry) => {
    this.updateAppState(addJournalEntry(this.state.appState, journalId, entry))
  }

  // State for updating the entry
  updateEntryValue = (journalId: number, entryId: number, sectionEntryId: number, entryItemId: number, value: ItemEntry) => {
    this.updateAppState(updateEntryValue(this.state.appState, journalId, entryId, sectionEntryId, entryItemId, value))
  }

  // State fore editing the journal name
  editJournalName = (journalId: number, name: string) => {
    this.updateAppState(editJournalName(this.state.appState, journalId, name))
  }

  // State for deleting the journal
  deleteJournal = (journalId: number) => {
    this.updateAppState(deleteJournal(this.state.appState, journalId))
  }

  // State for deleting the entry
  deleteEntry = (journalId: number, entryId: number) => {
    this.updateAppState(deleteEntry(this.state.appState, journalId, entryId))
  }

  // State for editing the item name
  editItemName = (journalId: number, sectionId: number, itemId: number, value: string) => {
    this.updateAppState(editItemName(this.state.appState, journalId, sectionId, itemId, value))
  }

  // State for editing the section name
  editSectionName = (journalId: number, sectionId: number, name: string) => {
    this.updateAppState(editSectionName(this.state.appState, journalId, sectionId, name))
  }

  // State for adding sections
  addSection = (journalId: number, type: ItemType) => {
    if (type == "freeform") {
      this.updateAppState(addSection(this.state.appState, journalId, {name: "Name Section", itemType: "freeform", items: [] }))  
    }
    else if (type == "checkbox") {
      this.updateAppState(addSection(this.state.appState, journalId, {name: "Name Section", itemType: "checkbox", items: [] }))
    }
  }

  // State for adding items
  addItem = (journalId: number, sectionId: number) => {
    this.updateAppState(addItem(this.state.appState, journalId, sectionId, { label: "unnamed" }))
  }

  // State for deleting sections
  deleteSection = (journalId: number, sectionId: number) => {
    this.updateAppState(deleteSection(this.state.appState, journalId, sectionId))
  }

  // State for deleting items
  deleteItem = (journalId: number, sectionId: number, itemId: number) => {
    this.updateAppState(deleteItem(this.state.appState, journalId, sectionId, itemId))
  }

  // Update the app state and save to electron
  updateAppState = (state: AppState) => {
    ipcRenderer.sendSync('save', ['data.json', JSON.stringify({ ...this.state.appState, ...state })])
    this.setState({appState: state});
  }

  // State for finalize journal
  onFinalizeJournal = (journalId: number) => { 
    this.updateAppState(finalizeJournal(this.state.appState, journalId))
  }

  // Display edit journal form
  editJournal = (journalId: number) => {
    window.location.hash = "/EditJournalForm";
    this.setState({journalId: journalId})
    this.forceUpdate();
  }

  // Display the journal selected
  onJournalSelected = (journalId: number) => {
    window.location.hash = "/JournalEntries";
    this.setState({journalId: journalId})
    this.forceUpdate();
  }

  // Display the entry selected
  onEntrySelected = (journalId: number, entryId: number) => {
    window.location.hash = "/ViewJournalEntry";
    this.setState({journalId: journalId, entryId: entryId})
    this.forceUpdate();
  }

  // Display the tutorial
  onTutorialSelected = () => {
    window.location.hash = "/Tutorial";
    this.forceUpdate();
  }

  // Render the routes
  render() {
    const searchParams = new URLSearchParams(window.location.search); 
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/EditJournalForm">
              <EditJournalTemplateComponent
                journal={this.state.appState.journals[this.state.journalId]}
                journalId={this.state.journalId}
                addSection={this.addSection}
                additem={this.addItem}
                deleteSection={this.deleteSection}
                editSectionName={this.editSectionName}
                editItemName={this.editItemName}
                deleteItem={this.deleteItem}
                onFinalizeJournal={this.onFinalizeJournal}
              />
            </Route>
            <Route path="/Tutorial"><Tutorial /></Route>
            <Route path="/JournalEntries">
              <JournalEntriesListComponent
                journal={this.state.appState.journals[this.state.journalId]}
                journalId={this.state.journalId}
                deleteEntry={this.deleteEntry}
                addJournalEntry={this.addJournalEntry}
                entrySelected={this.onEntrySelected}
              /> 
            </Route>
            <Route path="/ViewJournalEntry">
              <JournalEntryComponent
                journal={this.state.appState.journals[this.state.journalId]}
                journalId={this.state.journalId}
                entryId={this.state.entryId}
                updateEntryValue={this.updateEntryValue}
             />
            </Route>
            <Route path="/">              
              <JournalTemplateListComponent
                journals={this.state.appState.journals}
                journal={this.state.appState.journals[this.state.journalId]}
                journalId={this.state.journalId}
                addJournal={this.addJournal}
                deleteJournal={this.deleteJournal}
                editJournalName={this.editJournalName}
                editJournal={this.editJournal}
                journalSelected={this.onJournalSelected}
                onTutorialSelected={this.onTutorialSelected}
            />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

