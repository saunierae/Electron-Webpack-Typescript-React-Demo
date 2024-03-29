import React, { Component } from 'react'
import { Journal, JournalEntry, SectionEntry, ItemEntry } from "./AppState" 
import { assertNeverHit } from './Utilities';
import { JournalEntryComponent } from './JournalEntryComponent';
import { EditEntry } from './EditEntry';

// Create Journal Entry Props
type JournalEntriesComponentProps = {
    journal: Journal, 
    journalId: number,
    deleteEntry: (journalId: number, entryId: number) => void,
    addJournalEntry: (journalId: number, entry: JournalEntry) => void,
    entrySelected: (journalId: number, entryId: number) => void,
}

// Create Class for Journal Entries View page
export class JournalEntriesListComponent extends React.Component <JournalEntriesComponentProps>{
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
        const viewEntries =
            this.props.journal.journalEntries.map((entry, entryId) => {
                return <React.Fragment> 
                    <div className="journalEntries">  
                    <JournalEntryComponent 
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
                    </div>
                </React.Fragment> 
            })

        return (
            <div className="component-div">
                <h1>{this.props.journal.name}</h1> 
                <div>
                    <button className="journals" onClick={e => this.props.addJournalEntry(this.props.journalId, this.createEmptyJournalEntry())}>Add Entry</button>
                </div>
                <div className="journalEntries">
                    {viewEntries}
                </div>
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default JournalEntriesListComponent
