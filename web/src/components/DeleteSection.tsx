import * as React from "react";
import { useHistory } from "react-router-dom";

export class DeleteSection extends React.Component {

    Item = () => {
        let history = useHistory();
      };

    render() {
        return (
            <div>
                <h1>Select the Section to Delete</h1>
                <div>
                    <button>Section 1</button>
                </div>
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}


