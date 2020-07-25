import * as React from "react";
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Journal, Section, addJournal, SectionItem } from "./AppState";
import { EditSection } from "./EditSection";
import { EditItem } from "./EditItem";

type EditJournalFormProps = {
    journalId: number,    
    journal: Journal,
    sectionId: number,
    itemId: number,
    addSection: (journalId: number, type: string) => void,
    additem: (journalId: number, sectionId: number) => void,
    deleteSection: (journalId: number, sectionId: number) => void,
    deleteItem: (journalId: number, sectionId: number, itemId: number) => void,
    editSectionName: (journalId: number, sectionId: number, value: string) => void,
    editItemName: (journalId: number, sectionId: number, itemId: number, value: string) => void
}

export class EditJournalForm extends React.Component <EditJournalFormProps> {
    private nextID: number = 0;

    editSectionName = (sectionId: number, value: string ) => {
        this.props.editSectionName(this.props.journalId, sectionId, value);
    }

    editItemName = (sectionId: number, itemId: number, value: string ) => {
        this.props.editItemName(this.props.journalId, sectionId, itemId, value);
    }

    render() {

        const handleSectionSelect = (e: string) => {
            this.props.addSection(this.props.journalId, e);
        }

        const sections = this.props.journal.sections.map((s, index) => <EditSection key={index} sectionId={index} section={s} editSectionName={this.editSectionName}/>)
        const itemsArr = []
        const sectionArr = []

        for (var i = 0; i < sections.length; i++) {
            // sectionArr.push(sections[i]);
            itemsArr.push(sections[i].props.section.items.map((item: SectionItem, itemIndex: number) => <EditItem key={itemIndex} sectionId={i} itemId={itemIndex} item={item} editItemName={this.editItemName}/>))

            // for (var j = 0; j < itemsArr[i]; i++) {
            //     sectionArr.push(itemsArr[j]);
            // }
        }

        const viewSections = this.props.journal.sections.map((section, index) => 
        // const journals = this.props.journals.map((j, index) => <EditJournal key={index} journalId={index} journal={j} editJournalName={this.editJournalName}/>)
         {return <React.Fragment> 
         <EditSection key={index} sectionId={index} section={section} editSectionName={this.editSectionName}/>
          {/* <div>{journal.name}</div> */}
          <button
          onClick={() => this.props.deleteSection(this.props.journalId, index)}>Delete</button>
          <button onClick={() => this.props.additem(this.props.journalId, index)}>Add Item</button>
          </React.Fragment> })

        return (
            <div>
                <div>
                    <div>
                    Select Drop Down
                    </div>
                    <div>
                        <DropdownButton title="Add Section" onSelect={handleSectionSelect}>
                            <Dropdown.Item eventKey="freeform">Freeform</Dropdown.Item>
                            <Dropdown.Item eventKey="checkbox">CheckBox</Dropdown.Item>
                        </DropdownButton>
                    {/* <button onClick={() => this.props.addSection(this.props.journalId, document.getElementById("type").nodeValue)}>Add Another Section</button> */}
                </div>
                </div>
                {viewSections}
                {/* {sections} */}
                {itemsArr}
            </div>
        )
    }
}
