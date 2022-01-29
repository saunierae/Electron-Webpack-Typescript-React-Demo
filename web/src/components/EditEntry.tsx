import React, { Component } from 'react'
import { SectionItem, Journal, JournalEntry, ItemEntry } from './AppState'

// Create Props for Editing Items
type EditEntryProps = {
    journalId: number,
    entryId: number,
    sectionEntryId: number,
    entryItemId: number, 
    entryItem: ItemEntry
    editEntryValue: (journalId: number, entryId: number, sectionEntryId: number, entryItemId: number, value: ItemEntry) => void
}

// Create the class to edit items
export class EditEntry extends React.Component <EditEntryProps> {

    // Edit item name based on input and the item and section
    editEntryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editEntryValue(this.props.journalId, this.props.entryId, this.props.sectionEntryId, this.props.entryItemId, e.target.value)
               
    }
    
    // Always display
    render() {
        return (
            <div className="component-div">
                <input value={this.props.entryItem.toString()} onChange={ this.editEntryValue }></input>
            </div>
        )
    }
}