import React, { Component } from 'react'
import { Journal, JournalEntry, ItemEntry } from './AppState'

// Create props for editing entries
type JournalEntryComponentProps = {
    journal: Journal, 
    journalId: number, 
    entry: JournalEntry,
    entryId: number,
    entrySelected: (journalId: number, entryId: number) => void,
}

// Create class for editing entries
export class JournalEntryComponent extends React.Component <JournalEntryComponentProps> {
    
    // Select the entry
    onEntrySelected = () => {
        this.props.entrySelected(this.props.journalId, this.props.entryId)
    }
    
    render() {
        return (
            <>
                <a onClick={this.onEntrySelected}>{this.props.entry.name}</a>
            </>
        )
    }
}