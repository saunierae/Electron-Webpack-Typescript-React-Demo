import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {Journal} from "./AppState";
import { EditJournal } from "./EditJournal";

type CreateJournalTemplateProps = {
    journals: Journal[],
    addJournal: () => void,
    deleteJournal: (id: number) => void,
    editJournal: (id: number) => void
}

export class CreateJournalTemplate extends React.Component <CreateJournalTemplateProps>{

    render() {
       const journals = this.props.journals.map((journal, index) => 
       {return <React.Fragment key={index}> 
        <div>{journal.name}</div><button
        onClick={() => this.props.deleteJournal(index)}>Delete</button>
        <button onClick={() => this.props.editJournal(index)}>Edit</button></React.Fragment> })
        return (
            <div>
                <h1>Current Journals</h1>
                {journals}
                <button className="center" onClick={e => this.props.addJournal()}>Create Journal Template</button>
                {/* <button className="centerRow2" onClick={e => this.props.deleteJournal()}>Delete Journal</button> */}
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default CreateJournalTemplate


