export type ItemType = "checkbox" | "freeform"
export type AppState = {journals: Journal[]}
export type Journal = {name: string, sections: Section[]}
export type Section = {name: string, itemType: ItemType, items: SectionItem[]}
export type SectionItemBase = {label: string}
export type SectionItem = SectionItemBase;

//Create Journals
export const addJournal = (appState: AppState, journal: Journal): AppState => {
    return {journals: [...appState.journals, journal]};
  }

//Delete Journals
export const deleteJournal = (appState: AppState, journalId: number): AppState => {
    const newJournals = [...appState.journals];
    newJournals.splice(journalId, 1);
    return {journals: newJournals}
  }

//reusable code 1
//Helper function to update journals
const updateJournal = (appState: AppState, journalId: number, journal: Journal): AppState => {
    const newJournals = [...appState.journals];
    newJournals[journalId] = journal;
    return{ 
      ...appState,
      journals: newJournals
    }
  }

//Reusable code2
//Helper function to update sections
const updateSection = (appState: AppState, journalId: number, sectionId: number, section: Section): AppState => {
    const newSections = [...appState.journals[journalId].sections];
    newSections[sectionId] = section;
    const newJournal = {...appState.journals[journalId],
      sections: newSections
    }
    return updateJournal(appState, journalId, newJournal)
  }

//Reusable code 3
//Helper function to update items
const updateItem = (appState: AppState, journalId: number, sectionId: number, itemId: number, item: SectionItem): AppState => {
    const newItems = [...appState.journals[journalId].sections[sectionId].items];
    newItems[itemId] = item;
    const newSection = {...appState.journals[journalId].sections[sectionId],
      items: newItems
    }
    return updateSection(appState, journalId, sectionId, newSection)
}

//Delete sections
export const deleteSection = (appState: AppState, journalId: number, sectionId: number): AppState => {
    const newSections = [...appState.journals[journalId].sections];
    newSections.splice(sectionId, 1);
    const newJournal = {...appState.journals[journalId], 
      sections: newSections
    }
    return updateJournal(appState, journalId, newJournal);
  }

//Delete items
export const deleteItem = (appState: AppState, journalId: number, sectionId: number, itemId: number): AppState => {
  const newItems = [...appState.journals[journalId].sections[sectionId].items];
  newItems.splice(itemId, 1);
  const newSections = {...appState.journals[journalId].sections[sectionId], 
    items: newItems
  }
  return updateSection(appState, journalId, sectionId, newSections);
}

//Edit the Journal Name 
export const editJournalName = (appState: AppState, journalId: number, value: string): AppState => {
    const newJournal= {...appState.journals[journalId], name: value};
    return updateJournal(appState, journalId, newJournal);
  }

//Add new section with section info
export const addSection = (appState: AppState, journalId: number, sectionInfo: Section): AppState => {  
    const newSections: Section[] = [...appState.journals[journalId].sections, sectionInfo];
    const newJournal = {...appState.journals[journalId],
      sections: newSections
    }
    return updateJournal(appState, journalId, newJournal);
  }

  //Add new item with item info
export const addItem = (appState: AppState, journalId: number, sectionId: number, item: SectionItem): AppState => {  
  const newItems: SectionItem[] = [...appState.journals[journalId].sections[sectionId].items, item];
  const newSection = {...appState.journals[journalId].sections[sectionId],
    items: newItems
  }
  return updateSection(appState, journalId, sectionId, newSection);
}

//Edit Item name
export const editItemName = (appState: AppState, journalId: number, sectionId: number, itemId: number, value: string): AppState => {
    const newItem = {...appState.journals[journalId].sections[sectionId].items[itemId], label: value};
    return updateItem(appState, journalId, sectionId, itemId, newItem)
  }

//Edit Section Name
export const editSectionName = (appState: AppState, journalId: number, sectionId: number, value: string): AppState => {
    const newSection = {...appState.journals[journalId].sections[sectionId], name: value};
    return updateSection(appState, journalId, sectionId, newSection)
}