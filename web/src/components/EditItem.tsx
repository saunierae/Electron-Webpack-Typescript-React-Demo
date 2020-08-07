import React, { Component } from 'react'
import { SectionItem } from './AppState'

// Create Props for Editing Items
type EditItemProps = {
    item: SectionItem, 
    sectionId: number, 
    itemId: number, 
    editItemName: (sectionId: number, itemId: number, label: string) => void
}

// Create the class to edit items
export class EditItem extends React.Component <EditItemProps> {

    // Edit item name based on input and the item and section
    editItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editItemName(this.props.sectionId, this.props.itemId, e.target.value);
    }
    
    // Always display
    render() {
        return (
            <div>
                <input value={this.props.item.label} onChange={ this.editItemName }></input>
            </div>
        )
    }
}