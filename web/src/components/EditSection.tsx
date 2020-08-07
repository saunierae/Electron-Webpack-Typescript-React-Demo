import React, { Component } from 'react'
import { Section } from './AppState'

// Create props to edit the section
type EditSectionProps = {
    section: Section, 
    sectionId: number, 
    editSectionName: (sectionId: number, name: string) => void
}

// Create class to edit the section
export class EditSection extends React.Component <EditSectionProps> {

    // Edit the section name with user input
    editSectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editSectionName(this.props.sectionId, e.target.value);
    }
    
    // Always render
    render() {
        return (
            <div>
                <input value={this.props.section.name} onChange={ this.editSectionName }></input>
            </div>
        )
    }
}


