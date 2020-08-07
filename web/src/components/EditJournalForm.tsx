import * as React from "react";
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Journal, ItemType } from "./AppState";
import { EditSection } from "./EditSection";
import { EditItem } from "./EditItem";

// Create Props for the Journal Form
type EditJournalFormProps = {
    journalId: number,    
    journal: Journal,
    sectionId: number,
    itemId: number,
    addSection: (journalId: number, type: ItemType) => void,
    additem: (journalId: number, sectionId: number) => void,
    deleteSection: (journalId: number, sectionId: number) => void,
    deleteItem: (journalId: number, sectionId: number, itemId: number) => void,
    editSectionName: (journalId: number, sectionId: number, value: string) => void,
    editItemName: (journalId: number, sectionId: number, itemId: number, value: string) => void,
    onFinalizeJournal: (journalId: number) => void
}

// Create a state for the item type selected
type EditJournalFormState = {
    sectionType: ItemType,
}

// Create a class for editing the form taking in props and state
export class EditJournalForm extends React.Component <EditJournalFormProps, EditJournalFormState> {
    private nextID: number = 0;
    constructor(props) {
        super(props)
    
        this.state = {
             sectionType: "checkbox",
        }
    }
    
    // Change the selected type
    onChangeSectionType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({sectionType: e.target.value as ItemType})
    }

    // Edit the Section Name
    editSectionName = (sectionId: number, value: string ) => {
        this.props.editSectionName(this.props.journalId, sectionId, value);
    }

    //Edit the item name
    editItemName = (sectionId: number, itemId: number, value: string ) => {
        this.props.editItemName(this.props.journalId, sectionId, itemId, value);
    }

    // boolean to complete the journal
    onFinalizeJournal = () => {
        this.props.onFinalizeJournal(this.props.journalId)
    }

    render() {
        // Create a map of created sections to display
        const viewSections = this.props.journal.sections.map((section, sectionId) => { 
            // Create a map of created items to display
            const items = section.items.map((item, itemId) => {
                return <EditItem 
                    key={itemId} 
                    sectionId={sectionId} 
                    itemId={itemId} 
                    item={item} 
                    editItemName={this.editItemName} 
                />
             })

            return <React.Fragment>
                <EditSection 
                    key={sectionId} 
                    sectionId={sectionId} 
                    section={section} 
                    editSectionName={this.editSectionName}
                />
                <button
                    onClick={() => this.props.deleteSection(this.props.journalId, sectionId)}>Delete
                </button>
                <button 
                    onClick={() => this.props.additem(this.props.journalId, sectionId)}>Add Item
                </button>
                {items}
            </React.Fragment> 
        })

        // Always display the following
        return (
            <div>
                <div> 
                    Select Drop Down
                    <form>
                        <select value={this.state.sectionType} onChange={this.onChangeSectionType} id="type">
                            <option value="checkbox">Checkbox</option>
                            <option value="freeform">Freeform</option>
                        </select>
                    </form>
                </div>
                {viewSections}
                <div>
                    <button onClick={() => this.props.addSection(this.props.journalId, this.state.sectionType)}>Add Another Section</button>
                </div>
                <div>
                   <button onClick={this.onFinalizeJournal}>Complete Journal Template</button>
                </div>
                <button onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}
