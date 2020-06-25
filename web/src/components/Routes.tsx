import * as React from "react";
import { HashRouter, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
import { ToDoList } from "./ToDo";
import { CreateSection } from "./CreateSection";
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink  } from 'reactstrap';
import { CreateLabel } from "./CreateLabel";
import { DisplayJournal } from "./DisplayJournal";
import { App } from "./App";
import CreateJournalTemplate from "./CreateJournalTemplate";
import { CreateQuestion } from "./CreateQuestion";
import Tutorial from "./Tutorial";

export class Routes extends React.Component {

  render() {
    return (
      <div>
      <HashRouter>
          <Link to="/DisplayJournal" className="button">Display Journal</Link>
          <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
          <Link to="/CreateLabel" className="button">Create Label</Link>
          <Link to="/CreateSection" className="button">Create Section</Link>
          <Link to="/CreateQuestion" className="button">Create Question</Link>
          <Link to="/Tutorial" className="button">Tutorial</Link>
              <Switch>
                <Route path="/DisplayJournal"><DisplayJournal/></Route>
                <Route path="/CreateJournalTemplate"><CreateJournalTemplate/></Route>
                <Route path="/CreateLabel"><CreateLabel/></Route>
                <Route path="/CreateSection"><CreateSection/></Route>
                <Route path="/CreateQuestion"><CreateQuestion/></Route>
                <Route path="/Tutorial"><Tutorial/></Route>
              </Switch>
      </HashRouter>
      </div>
    )
  }
}