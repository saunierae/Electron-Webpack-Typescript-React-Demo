import React, { Component } from 'react'
import { Journal, JournalEntry } from './AppState'

// Create props for editing entries
type EditEntriesProps = {
    journal: Journal, 
    journalId: number, 
    entry: JournalEntry,
    entryId: number,
    entrySelected: (journalId: number, entryId: number) => void
}

// Create class for editing entries
export class EditEntries extends React.Component <EditEntriesProps> {

    // Select the entry
    onEntrySelected = () => {
        this.props.entrySelected(this.props.journalId, this.props.entryId)
    }
    
    render() {
        // Create hyperlink for entries created
        const entryName = this.props.journal.entries.length > 0 ? 
            <a onClick={this.onEntrySelected}>{this.props.entry.name}</a>:
            null
        // Display entries created
        return (
            <>
            {entryName}
            </>
        )
    }
}