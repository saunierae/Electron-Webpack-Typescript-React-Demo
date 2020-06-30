import * as React from "react";
import { useHistory } from "react-router-dom";

// import CurrentJournals from "./SelectJournalTemplate/SelectJournalTemplate"

export class CreateJournalTemplate extends React.Component {


    // Item = () => {
    //     let history = useHistory();
    //   };

    render() {
        return (
            <div>
                <h1>Current Journals</h1>
                <div>
                    {/* <HashRouter>
                        <Link to="/CreateJournalTemplate" className="button">Create Journal Template</Link>
                            <Switch>
                                <Route path="/CreateJournalTemplate"><CreateJournalTemplate/></Route>
                            </Switch>
                    </HashRouter> */}
                </div>
                <button className="journalTemplatebtn">Create Journal Template</button>
                {/* <button onClick={() => history.back()}>Back</button> */}
            </div>
        )
    }
}

export default CreateJournalTemplate


