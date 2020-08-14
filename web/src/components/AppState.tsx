//create and export data types
export type ItemType = "checkbox" | "freeform" 
export type AppState = {journals: Journal[]}
export type Journal = {name: string, sections: Section[], finalized: boolean, journalEntries: JournalEntry[]}
export type Section = {name: string, itemType: ItemType, items: SectionItem[]}
export type SectionItemBase = {label: string}
export type SectionItem = SectionItemBase;
export type FreeformData = {dataFreeform: string}
export type CheckBox = {checkbox: boolean}
export type JournalEntry = { name: string, sectionEntries: SectionEntry[]}
export type SectionEntry = { itemEntries: ItemEntry[]}
export type ItemEntry = boolean | string;

//Finalize the journal
export const finalizeJournal = (appState: AppState, journalId: number) => {
  const newJournal = {...appState.journals[journalId], finalized: true}
  return updateJournal(appState, journalId, newJournal)
}

//Create Journals
export const addJournal = (appState: AppState, journal: Journal): AppState => {
  return {journals: [...appState.journals, journal]};
}

 //Add Journal Entry
export const addJournalEntry = (appState: AppState, journalId: number, entryInfo: JournalEntry): AppState => {
  const newEntries: JournalEntry[] = [...appState.journals[journalId].journalEntries, entryInfo];
  const newJournal: Journal = {...appState.journals[journalId], 
    journalEntries: newEntries
  }
  return updateJournal(appState, journalId, newJournal)
}

//Delete Journals
export const deleteJournal = (appState: AppState, journalId: number): AppState => {
  const newJournals = [...appState.journals];
  newJournals.splice(journalId, 1);
  return {journals: newJournals}
}

  //Delete Journals
export const deleteEntry = (appState: AppState, journalId: number, entryId: number): AppState => {
  const newEntries = [...appState.journals[journalId].journalEntries];
  newEntries.splice(entryId, 1);
  const newJournal = {...appState.journals[journalId], journalEntries: newEntries}
  return updateJournal(appState, journalId, newJournal)
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

//Reusable code 4
// Helper function to update sections
const updateEntry = (appState: AppState, journalId: number, entryId: number, entry: JournalEntry): AppState => {
  const newEntries = [...appState.journals[journalId].journalEntries];
  newEntries[entryId] = entry;
  const newJournal: Journal = {...appState.journals[journalId],
    journalEntries: newEntries
  }
  return updateJournal(appState, journalId, newJournal)
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

//Edit entry data
export const updateEntryValue = (appState: AppState, journalId: number, journalEntryId: number, sectionEntryId: number, entryItemId: number, value: ItemEntry): AppState => {
  const newItems: ItemEntry[] = [...appState.journals[journalId].journalEntries[journalEntryId].sectionEntries[sectionEntryId].itemEntries];
  newItems[entryItemId] = value
  const newSections: SectionEntry[] = [...appState.journals[journalId].journalEntries[journalEntryId].sectionEntries]
  newSections[sectionEntryId] = {...newSections[sectionEntryId], itemEntries: newItems}
  const newEntryValue: JournalEntry = {...appState.journals[journalId].journalEntries[journalEntryId], sectionEntries: newSections};
  return updateEntry(appState, journalId, entryItemId, newEntryValue)
}

//Edit Section Name
export const editSectionName = (appState: AppState, journalId: number, sectionId: number, value: string): AppState => {
  const newSection = {...appState.journals[journalId].sections[sectionId], name: value};
  return updateSection(appState, journalId, sectionId, newSection)
}