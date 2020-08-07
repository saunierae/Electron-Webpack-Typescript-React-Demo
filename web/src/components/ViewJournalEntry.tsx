import React, { Component } from 'react'
import { Journal, JournalEntry, ItemEntry } from './AppState'

// create View Journal props
type ViewJournalEntryProps = {
    journal: Journal,
    journalId: number,
    entryId: number,
    updateEntryValue: (journalId: number, entryId: number, sectionEntryId: number, entryItemId: number, value: ItemEntry) => void,
}

// Create class View journal entries
export class ViewJournalEntry extends Component <ViewJournalEntryProps> {
    render() {
        // Display the following for created journals and entries 
        const journalEntry = this.props.journal.entries[this.props.entryId];
        const journalSections = journalEntry.sectionEntries.map( (sectionEntry, sectionEntryIndex) => {
            const sectionType = this.props.journal.sections[sectionEntryIndex].itemType
            const sectionName = this.props.journal.sections[sectionEntryIndex].name
            const items = sectionEntry.itemEntries.map((item, itemEntryIndex) => {
                const itemName = this.props.journal.sections[sectionEntryIndex].items[itemEntryIndex].label
                const itemInput = sectionType === "checkbox" ? <input type="checkbox" onChange={
                    e => this.props.updateEntryValue(this.props.journalId, this.props.entryId, sectionEntryIndex, itemEntryIndex, this.props.journal.entries[this.props.entryId].sectionEntries[sectionEntryIndex].itemEntries[itemEntryIndex])}></input>:
                    <input type="text" onChange={
                        e => this.props.updateEntryValue(this.props.journalId, this.props.entryId, sectionEntryIndex, itemEntryIndex, this.props.journal.entries[this.props.entryId].sectionEntries[sectionEntryIndex].itemEntries[itemEntryIndex])}></input>
                     
                return (
                    <div key={itemEntryIndex}>
                        {itemName}
                        {itemInput}
                    </div>
                )
            })
            return (
                <div key={sectionEntryIndex}
                    >
                    {sectionName}
                    {items}
                </div>
            )
        })
        return (
            <div>
                {journalSections}
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default ViewJournalEntry
