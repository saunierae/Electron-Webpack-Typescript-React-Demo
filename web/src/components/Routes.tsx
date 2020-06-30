import * as React from "react";
import { HashRouter, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
import { ToDoList } from "./ToDo";
import { CreateSection } from "./CreateSection";
import { CreateLabel } from "./CreateLabel";
import { JournalTemplateView } from "./JournalTemplateView";
import { App } from "./App";
import CreateJournalTemplate from "./CreateJournalTemplate";
import { CreateQuestion } from "./CreateQuestion";
import Tutorial from "./Tutorial";
import { LabelCheck } from "./LabelCheck";
import { TotalSum } from "./TotalSumLabel";
import { DeleteSection } from "./DeleteSection";
import { DeleteJournal } from "./DeleteJournal";

export class Routes extends React.Component {

  render() {
    return (
      <div>
      <HashRouter>
          <Link to="/JournalTemplateView" className="button">Journal Template View</Link>
          <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
          <Link to="/CreateLabel" className="button">Create Label</Link>
          <Link to="/CreateSection" className="button">Create Section</Link>
          <Link to="/CreateQuestion" className="button">Create Question</Link>
          <Link to="/Tutorial" className="button">Tutorial</Link>
          <Link to="/LabelCheck" className="button">Label checkbox</Link>
          <Link to="/TotalSum" className="button">Total Sum Label</Link>
          <Link to="/DeleteSection" className="button">Delete Section</Link>
          <Link to="/DeleteJournal" className="button">Delete Journal</Link>
              <Switch>
                <Route path="/JournalTemplateView"><JournalTemplateView/></Route>
                <Route path="/CreateJournalTemplate"><CreateJournalTemplate/></Route>
                <Route path="/CreateLabel"><CreateLabel/></Route>
                <Route path="/CreateSection"><CreateSection/></Route>
                <Route path="/CreateQuestion"><CreateQuestion/></Route>
                <Route path="/Tutorial"><Tutorial/></Route>
                <Route path="/LabelCheck"><LabelCheck/></Route>
                <Route path="/TotalSum"><TotalSum/></Route>
                <Route path="/DeleteSection"><DeleteSection/></Route>
                <Route path="/DeleteJournal"><DeleteJournal/></Route>
              </Switch>
      </HashRouter>
      </div>
    )
  }
}