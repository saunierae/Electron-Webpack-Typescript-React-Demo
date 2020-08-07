import React, { Component } from 'react'
import { Journal, FreeformData, CheckBox, JournalEntry, SectionEntry } from "./AppState" 
import { assertNeverHit } from './Utilities';
import { EditEntries } from './EditEntries';

// Create Journal Entry Props
type JournalEntriesProps = {
    journal: Journal, 
    journalId: number,
    entryId: number,
    deleteEntry: (journalId: number, entryId: number) => void,
    addJournalEntry: (journalId: number, entry: JournalEntry) => void,
    entrySelected: (journalId: number, entryId: number) => void,
}

// Create Class for Journal Entries View page
export class JournalEntriesView extends React.Component <JournalEntriesProps>{
    // Create an empty journal entry for selected case
    createEmptyJournalEntry = () => {
        const sectionEntries: SectionEntry[] = this.props.journal.sections.map(section => {
            const sectionEntry: SectionEntry = {
                itemEntries: section.items.map(item => {
                    switch(section.itemType) {
                        case "checkbox":
                            return false;
                        case "freeform":
                            return "";
                        default: 
                            return assertNeverHit(section.itemType);
                    }
                })
            }
            return sectionEntry
        })
        //name the entry
        const journalEntry: JournalEntry = {
            sectionEntries: sectionEntries, name: Date().toString()
        }
        return journalEntry
    }
    
    render() {
        // Show entries if the entries exist    
        const viewEntries = this.props.journal.entries.length > 0 ? 
            this.props.journal.entries.map((entry, entryId) => {
                return <React.Fragment> 
                    <EditEntries 
                        key={entryId} 
                        journal={this.props.journal}
                        journalId={this.props.journalId}
                        entry={entry} 
                        entryId={entryId}
                        entrySelected={this.props.entrySelected}
                    />
                    <button
                        onClick={() => this.props.deleteEntry(this.props.journalId, entryId)}>Delete
                    </button>
                </React.Fragment>
            }): null

        return (
            <div>
                <h1>{this.props.journal.name}</h1> 
                <button className="center" onClick={e => this.props.addJournalEntry(this.props.journalId, this.createEmptyJournalEntry())}>Add Entry</button>
                {/* {entryName} */}
                {viewEntries}
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default JournalEntriesView
