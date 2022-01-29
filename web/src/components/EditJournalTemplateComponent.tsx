import * as React from "react";
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Journal, ItemType } from "./AppState";
import { EditSection } from "./EditSection";
import { EditItem } from "./EditItem";

// Create Props for the Journal Form
type EditJournalTemplateComponentProps = {
    journalId: number,    
    journal: Journal,
    addSection: (journalId: number, type: ItemType) => void,
    additem: (journalId: number, sectionId: number) => void,
    deleteSection: (journalId: number, sectionId: number) => void,
    deleteItem: (journalId: number, sectionId: number, itemId: number) => void,
    editSectionName: (journalId: number, sectionId: number, value: string) => void,
    editItemName: (journalId: number, sectionId: number, itemId: number, value: string) => void,
    onFinalizeJournal: (journalId: number) => void
}

// Create a state for the item type selected
type EditJournalTemplateComponentState = {
    sectionType: ItemType,
}

// Create a class for editing the form taking in props and state
export class EditJournalTemplateComponent extends React.Component <EditJournalTemplateComponentProps, EditJournalTemplateComponentState> {
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
                return <div className="item"> <EditItem 
                    key={itemId} 
                    sectionId={sectionId} 
                    itemId={itemId} 
                    item={item} 
                    editItemName={this.editItemName} 
                />
                </div>
             })

            return <React.Fragment>
                <div className="section component-div">
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
                    </div>
            </React.Fragment> 
        })

        // Always display the following
        return (
            <div className="component-div">
                <h1>Create Sections and Items for the Journal</h1>
                <div className="instructions"> 
                    <ol>
                    <li>Select Drop Down for the desired section type</li>
                    <li>Click add sections</li>
                    <li>Label the section</li>
                    <li>Click add item for the section</li>
                    <li>Label the item</li>
                    <li>To add more sections, repeat the above steps until the desired journal is completed</li>
                    <li>Select the "Complete Journal Template to finialize the journal" then select return</li>
                    <p>Note: The sectons will need to ahve a matching input for all types, otherwise you will want to create a new section</p>
                    </ol>
                </div>
                <div>
                    <form className="selection">
                        <select value={this.state.sectionType} onChange={this.onChangeSectionType} id="type">
                            <option value="checkbox">Checkbox</option>
                            <option value="freeform">Freeform</option>
                        </select>
                    </form>
                </div>
                <div className="sectionButton">
                    <button onClick={() => this.props.addSection(this.props.journalId, this.state.sectionType)}>Add Section</button>
                </div>
                <div className="sectionItems">
                    {viewSections}
                </div>
                <div>
                   <button className="complete" onClick={this.onFinalizeJournal}>Complete Journal Template</button>
                </div>
                <div>
                    <button className="bottomRow" onClick={() => history.back()}>Return</button>
                </div>
            </div>
        )
    }
}
