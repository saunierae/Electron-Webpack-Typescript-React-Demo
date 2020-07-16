export type AppState = {journals: Journal[]}
export type Journal = {name: string, sections: Section[]}
export type Section = {items: SectionItem[]}
export type SectionItemBase = {label: string}
export type SectionItem = SectionItemBase & (CheckboxItem | FreeformItem);
export type CheckboxItem = {type: "checkbox", checkboxLabels: string[]}
export type FreeformItem = {type: "freeform", textareaLabels: string[]}


export const addJournal = (appState: AppState, journal: Journal): AppState => {
    return {journals: [...appState.journals, journal]};
  }

export const deleteJournal = (appState: AppState, id: number): AppState => {
    const newJournals = [...appState.journals];
    newJournals.splice(id, 1);
    return {journals: newJournals}
  }

const updateJournal = (appState: AppState, journalId: number, journal: Journal): AppState => {
    const newJournals = [...appState.journals];
    newJournals[journalId] = journal;
    return{ 
      ...appState,
      journals: newJournals
    }
  }

const updateSection = (appState: AppState, journalId: number, sectionId: number, section: Section): AppState => {
    const newSections = [...appState.journals[journalId].sections];
    newSections[sectionId] = section;
    const newJournal = {...appState.journals[journalId],
      sections: newSections
    }
    return updateJournal(appState, journalId, newJournal)
  }


export const deleteSection = (appState: AppState, id: number, sectionId: number): AppState => {
    const newSections = [...appState.journals[id].sections];
    newSections.splice(sectionId, 1);
    const newJournal = {...appState.journals[id], 
      sections: newSections
    }
    return updateJournal(appState, id, newJournal);
  }

export const editJournalName = (appState: AppState, id: number, value: string): AppState => {
    const newJournal= {...appState.journals[id], name: value};
    return updateJournal(appState, id, newJournal);
  }

export const addSection = (appState: AppState, id: number, sectionInfo: Section): AppState => {  
    const newSections: Section[] = [...appState.journals[id].sections, sectionInfo];
    const newJournal = {...appState.journals[id],
      sections: newSections
    }
    return updateJournal(appState, id, newJournal);
  }

export const editSectionName = (appState: AppState, journalId: number, sectionId: number, value: string): AppState => {
    const newSection = {...appState.journals[journalId].sections[sectionId], name: value};
    return updateSection(appState, journalId, sectionId, newSection)
  }
