import * as React from "react";
import { HashRouter, Route, NavLink as HashLink, Link, Switch } from "react-router-dom";
// import { Router, Switch, Route } from "react-router-dom";

// import CurrentJournals from "./SelectJournalTemplate/SelectJournalTemplate"

export class CreateJournalTemplate extends React.Component {



    render() {
        return (
            <div>
                <h1>Current Journals</h1>
                {/* <HashRouter>
                    <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
                        <Switch>
                            <Route path="/CreateJournalTemplate"><CreateJournalTemplate/></Route>
                        </Switch>
                </HashRouter> */}
                <form>
                    {/* <Button variant="btn btn-success" onClick={() => history.push('/SelectJournalTemplate')}>Create Journal Template</Button>  */}
               </form>
            </div>
        )
    }
}

export default CreateJournalTemplate


