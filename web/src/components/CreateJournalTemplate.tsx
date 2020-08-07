import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {Journal} from "./AppState";
import { EditJournalForm } from "./EditJournalForm";
import { EditJournal } from "./EditJournal";

// Create properties for the journal template
type CreateJournalTemplateProps = {
    journals: Journal[],
    journalId: number,    
    journal: Journal,
    addJournal: () => void,
    deleteJournal: (journalId: number) => void,
    editJournal: (journalId: number) => void,
    editJournalName: (journalId: number, value: string) => void,
    journalSelected: (journalId: number) => void,
    onTutorialSelected: () => void,
}

//Create the class for Journal Template
export class CreateJournalTemplate extends React.Component <CreateJournalTemplateProps>{

    //edit journal name for selected journal
    editJournalName = (journalId: number, value: string ) => {
        this.props.editJournalName(journalId, value);
    }
    
    render() {
        // create a map of the current journals and pass in the id
        const journals = this.props.journals.map((journal, journalId) => {
            // if the journal is finalized do not display the edit button
            const editButton = journal.finalized ? 
                null: 
                <button onClick={() => this.props.editJournal(journalId)}>Edit</button>
           return <React.Fragment> 
                <EditJournal 
                    key={journalId} 
                    journalId={journalId} 
                    journal={journal} 
                    editJournalName={this.editJournalName}
                    journalSelected={this.props.journalSelected}
                />
                <button
                    onClick={() => this.props.deleteJournal(journalId)}>Delete
                </button>
                {editButton}
            </React.Fragment> 
        })
        // Always show the following options
        return (
            <div>
                <h1>Current Journals</h1>
                {journals}
                <button className="center" onClick={e => this.props.addJournal()}>Create Journal Template</button>
                <button className="centerRow2" onClick={e => this.props.onTutorialSelected()}>View Tutorial</button>
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default CreateJournalTemplate


