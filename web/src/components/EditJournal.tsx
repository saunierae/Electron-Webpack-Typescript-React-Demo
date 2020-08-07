import React, { Component } from 'react'
import { Journal } from './AppState'

// Create Props for editing the journal
type EditJournalProps = {
    journal: Journal, 
    journalId: number, 
    editJournalName: (journalId: number, name: string) => void,
    journalSelected: (journalId: number) => void
}

// Create a class to edit the journal
export class EditJournal extends React.Component <EditJournalProps> {

    // Edit the journal name by taking in the value for selected journal
    editJournalName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editJournalName(this.props.journalId, e.target.value);
    }

    // Select the journal
    onJournalSelected = () => {
        this.props.journalSelected(this.props.journalId)
    }
    
    render() {
        // If the journal has been completed allow accessing the journal to add entries
        const journalName =this.props.journal.finalized ? 
            <a onClick={this.onJournalSelected}>{this.props.journal.name}</a>:
            <input value={this.props.journal.name} onChange={ this.editJournalName }></input>
        return (
            <>
            {journalName}
            </>
        )
    }
}
