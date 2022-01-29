import * as React from "react";
import {useImage} from "react-image";
import { useHistory } from "react-router-dom";


// Display tutorial information
function Tutorial() {
    return (
        <div className="component-div">
            <h1>Tutorial</h1>
            <h2>How it works:</h2>
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
            <img src="tutorialImage.png" className="Example" alt="Example"/>
            <button className="bottomRow" onClick={() => history.back()}>Back</button>
        </div>
    )
}

export default Tutorial



