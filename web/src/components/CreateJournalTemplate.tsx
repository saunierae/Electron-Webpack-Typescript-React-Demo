import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {Journal} from "./AppState";
import { EditJournalForm } from "./EditJournalForm";
import { EditJournal } from "./EditJournal";

type CreateJournalTemplateProps = {
    journals: Journal[],
    journalId: number,    
    journal: Journal,
    addJournal: () => void,
    deleteJournal: (journalId: number) => void,
    editJournal: (journalId: number) => void,
    editJournalName: (journalId: number, value: string) => void,
}


export class CreateJournalTemplate extends React.Component <CreateJournalTemplateProps>{

    editJournalName = (journalId: number, value: string ) => {
        this.props.editJournalName(this.props.journalId, value);
    }
    
    render() {
       const journals = this.props.journals.map((journal, index) => 
      // const journals = this.props.journals.map((j, index) => <EditJournal key={index} journalId={index} journal={j} editJournalName={this.editJournalName}/>)
       {return <React.Fragment> 
       <EditJournal key={index} journalId={index} journal={journal} editJournalName={this.editJournalName}/>
        {/* <div>{journal.name}</div> */}
        <button
        onClick={() => this.props.deleteJournal(index)}>Delete</button>
        <button onClick={() => this.props.editJournal(index)}>Edit</button></React.Fragment> })
        return (
            <div>
                <h1>Current Journals</h1>
                {journals}
                <button className="center" onClick={e => this.props.addJournal()}>Create Journal Template</button>
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default CreateJournalTemplate


