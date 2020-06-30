import * as React from "react";
import { useHistory } from "react-router-dom";

export class DeleteJournal extends React.Component {

Item = () => {
    let history = useHistory();
  };

render() {
    return (
        <div>
            <h1>Select the Journal to Delete</h1>
            <div>
                <button>Journal 1</button>
            </div>
            <button className="bottomRow" onClick={() => history.back()}>Back</button>
        </div>
    )
}
}