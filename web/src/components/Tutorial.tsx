import * as React from "react";
import { useHistory } from "react-router-dom";
import './tutorialImage.PNG';

function Tutorial() {

     const Item = () => {
        let history = useHistory();
      };

    return (
        <div>
            <h1>Tutorial</h1>
            <h2>How it works:</h2>
            <ol>
                <li>Select add a secton</li>
                <li>Fill out the prompts in the new window that will appear for the number of questions or labels you would like</li>
                <li>Select the input type</li>
                <p>Note: The sectons will need to ahve a matching question/lable and input for all types, otherwise you will want to create a new section</p>
                <li>Select Complete Section</li>
                <li>View the current template to see the layout of all of the sections created for your journal</li>
                <li>Select Complete Journal Template when you are satisified with your Template</li>
            </ol>
            <h2>To Remove sections:</h2>
            <ol>
                <li>Select the Delete Section</li>
                <li>Click on the section to be removed</li>
                <li>Click yes to remove the section</li>
            </ol>
            <img src='tutorialImage.PNG' className="Example" alt="Example"/>
            <button className="bottomRow" onClick={() => history.back()}>Back</button>
        </div>
    )
}

export default Tutorial



