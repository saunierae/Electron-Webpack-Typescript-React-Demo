import React, { Component } from 'react'
import { Journal } from './AppState'

type EditJournalProps = {journal: Journal, journalId: number, editJournalName: (journalId: number, name: string) => void}


export class EditJournal extends React.Component <EditJournalProps> {

    
    editJournalName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editJournalName(this.props.journalId, e.target.value);
    }
    
    render() {
        return (
            <div>
                <input value={this.props.journal.name} onChange={ this.editJournalName }></input>
            </div>
        )
    }
}
