import React, { Component } from 'react'
import { Section } from './AppState'

type EditSectionProps = {section: Section, sectionId: number, editSectionName: (sectionId: number, name: string) => void}


export class EditSection extends React.Component <EditSectionProps> {

    
    editSectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.editSectionName(this.props.sectionId, e.target.value);
    }
    
    render() {
        return (
            <div>
                <input value={this.props.section.name} onChange={ this.editSectionName }></input>
            </div>
        )
    }
}


