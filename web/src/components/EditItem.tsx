import React, { Component } from 'react'
import { SectionItem } from './AppState'

type EditItemProps = {item: SectionItem, sectionId: number, itemId: number, editItemName: (itemId: number, label: string) => void}


export class EditItem extends React.Component <EditItemProps> {

    
    editItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editItemName(this.props.itemId, e.target.value);
    }
    
    render() {
        return (
            <div>
                <input value={this.props.item.label} onChange={ this.editItemName }></input>
            </div>
        )
    }
}