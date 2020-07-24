import * as React from "react";
import './Styles.css';
import { Journal, Section, addJournal, SectionItem } from "./AppState";
import { EditSection } from "./EditSection";
import { EditItem } from "./EditItem";

type EditJournalFormProps = {
    journalId: number,    
    journal: Journal,
    sectionId: number,
    itemId: number,
    addSection: (journalId: number) => void,
    additem: (journalId: number, sectionId: number) => void,
    deleteSection: (journalId: number, sectionId: number) => void,
    deleteItem: (journalId: number, sectionId: number, itemId: number) => void,
    editSectionName: (journalId: number, sectionId: number, value: string) => void,
    // editJournalName: (journalId: number, value: string) => void,
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

    // editJournalName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     this.props.editJournalName(this.props.journalId, e.target.value);
    // }

    render() {

        const sections = this.props.journal.sections.map((s, index) => <EditSection key={index} sectionId={index} section={s} editSectionName={this.editSectionName}/>)
        const itemsArr = []        
        sections.forEach(function(section, index, arr)  {
            itemsArr.push(section.props.items.map((i: SectionItem, index: number) => <EditItem key={index} sectionId={index} itemId={index} item={i} editItemName={this.editItemName}/>))
        })
        //sections.forEach(section => itemsArr.push(this.props.journal.sections[section.key].items))       

        //const items = this.props.journal.sections.items.map((s, i, index) => <EditItem key={index} sectionId={index} section={s} itemId={index} item={i} editItemName={this.editItemName}/>)
        return (
            <div>
                {/* <div>
                    <p>Enter Journal Name</p>
                    <input onChange={ this.editJournalName}/>
                </div> */}
                <div>
                    <div>
                    Enter Section Name:
                    <input/></div>
                    <div>
                    Select Drop Down
                    <form>
                        <label>
                            <select id="type">
                                <option value="checkbox">Checkbox</option>
                                <option value="freeform">Freeform</option>
                            </select>
                        </label>
                    </form>
                    </div>
                    <div>
                        <button onClick={() => this.props.additem(this.props.journalId, this.props.sectionId)}>Add Item</button>
                    </div>
                </div>
                {sections}
                {itemsArr}
                <div>
                    <button onClick={() => this.props.addSection(this.props.journalId)}>Add Another Section</button>
                </div>
            </div>
        )
    }
}
