import * as React from "react";
import { HashRouter, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
import { JournalEntriesView } from "./JournalEntriesView"
import { EditJournalForm } from "./EditJournalForm";
import CreateJournalTemplate from "./CreateJournalTemplate";
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
  updateEntryValue
} from "./AppState";
import ViewJournalEntry from "./ViewJournalEntry";

export class Routes extends React.Component<{}, AppState> {

  constructor(props) {
    super(props)

    this.state =
      ipcRenderer.sendSync('read', "data.json")
  }

  // State for adding a journal
  addJournal = () => {
    this.updateAppState(addJournal(this.state, { name: "Name Journal", sections: [], finalized: false, entries: [] }))
  }

  // State for adding a journal entry
  addJournalEntry = (journalId: number, entry: JournalEntry) => {
    this.updateAppState(addJournalEntry(this.state, journalId, entry))
  }

  // State for updating the entry
  updateEntryValue = (journalId: number, entryId: number, sectionEntryId: number, entryItemId: number, value: ItemEntry) => {
    this.updateAppState(updateEntryValue(this.state, journalId, entryId, sectionEntryId, entryItemId, value))
  }

  // State fore editing the journal name
  editJournalName = (journalId: number, name: string) => {
    this.updateAppState(editJournalName(this.state, journalId, name))
  }

  // State for deleting the journal
  deleteJournal = (journalId: number) => {
    this.updateAppState(deleteJournal(this.state, journalId))
  }

  // State for deleting the entry
  deleteEntry = (journalId: number, entryId: number) => {
    this.updateAppState(deleteJournal(this.state, entryId))
  }

  // State for editing the item name
  editItemName = (journalId: number, sectionId: number, itemId: number, value: string) => {
    this.updateAppState(editItemName(this.state, journalId, sectionId, itemId, value))
  }

  // State for editing the section name
  editSectionName = (journalId: number, sectionId: number, name: string) => {
    this.updateAppState(editSectionName(this.state, journalId, sectionId, name))
  }

  // State for adding sections
  addSection = (journalId: number, type: ItemType) => {
    if (type == "freeform") {
      this.updateAppState(addSection(this.state, journalId, {name: "Name Section", itemType: "freeform", items: [] }))  
    }
    else if (type == "checkbox") {
      this.updateAppState(addSection(this.state, journalId, {name: "Name Section", itemType: "checkbox", items: [] }))
    }
  }

  // State for adding items
  addItem = (journalId: number, sectionId: number) => {
    this.updateAppState(addItem(this.state, journalId, sectionId, { label: "unnamed" }))
  }

  // State for deleting sections
  deleteSection = (journalId: number, sectionId: number) => {
    this.updateAppState(deleteSection(this.state, journalId, sectionId))
  }

  // State for deleting items
  deleteItem = (journalId: number, sectionId: number, itemId: number) => {
    this.updateAppState(deleteItem(this.state, journalId, sectionId, itemId))
  }

  // Update the app state and save to electron
  updateAppState = (state: AppState) => {
    ipcRenderer.sendSync('save', ['data.json', JSON.stringify({ ...this.state, ...state })])
    this.setState(state);
  }

  // State for finalize journal
  onFinalizeJournal = (journalId: number) => { 
    this.updateAppState(finalizeJournal(this.state, journalId))
  }

  // Display edit journal form
  editJournal = (journalId: number) => {
    window.location.hash = "/EditJournalForm";
    window.location.search = "id=" + journalId;
    this.forceUpdate();
  }

  // Display the journal selected
  onJournalSelected = (journalId: number) => {
    window.location.hash = "/JournalEntriesView";
    window.location.search = "id=" + journalId;
    this.forceUpdate();
  }

  // Display the entry selected
  onEntrySelected = (journalId: number, entryId: number) => {
    window.location.hash = "/ViewJournalEntry";
    window.location.search = "id=" + journalId;
    window.location.search = "id=" + entryId;
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
    const journalId = parseInt(searchParams.get("id"));
    const entryId = parseInt(searchParams.get("id"));
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
      onFinalizeJournal={this.onFinalizeJournal}
      /> : null; 

    const createJournalTemplate = !isNaN(journalId) ? <CreateJournalTemplate
      journals={this.state.journals}
      journal={this.state.journals[journalId]}
      journalId={journalId}
      addJournal={this.addJournal}
      deleteJournal={this.deleteJournal}
      editJournal={this.editJournal}
      editJournalName={this.editJournalName}
      journalSelected={this.onJournalSelected}
      onTutorialSelected={this.onTutorialSelected}
      /> : null; 

    return (
      <div>
        <HashRouter>
          <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
          <Switch>
            <Route path="/EditJournalForm">{editJournalForm}</Route>
            <Route path="/CreateJournalTemplate">
              <CreateJournalTemplate
                journals={this.state.journals}
                journal={this.state.journals[journalId]}
                journalId={journalId}
                addJournal={this.addJournal}
                deleteJournal={this.deleteJournal}
                editJournalName={this.editJournalName}
                editJournal={this.editJournal}
                journalSelected={this.onJournalSelected}
                onTutorialSelected={this.onTutorialSelected}
              />
            </Route>
            <Route path="/Tutorial"><Tutorial /></Route>
            <Route path="/JournalEntriesView">
              <JournalEntriesView
                journal={this.state.journals[journalId]}
                journalId={journalId}
                entryId={entryId}
                deleteEntry={this.deleteEntry}
                addJournalEntry={this.addJournalEntry}
                entrySelected={this.onEntrySelected}
              /> 
            </Route>
            <Route path="/ViewJournalEntry">
              <ViewJournalEntry
                journal={this.state.journals[journalId]}
                journalId={journalId}
                entryId={entryId}
                //entry={this.state.journals[journalId].entries[entryId]}
                updateEntryValue={this.updateEntryValue}
             />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}