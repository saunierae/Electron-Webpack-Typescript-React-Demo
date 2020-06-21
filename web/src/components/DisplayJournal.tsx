// import * as React from "react";
// import { useCallback } from "react";
// import './Styles.css';
// import {ipcRenderer} from "electron"; 

// export class DisplayJournal extends React.Component {
//     render() {
//         return (
//             <div>
//                  <button onClick={ this.display}>Add to List</button>
//             </div>
//         )
//     }
//     private display = () => ipcRenderer.on("read","mytext.txt");
// }

import * as React from "react";
import { useCallback } from "react";
import './Styles.css';
import {ipcRenderer} from "electron";

export class DisplayJournal extends React.Component {

    buildList (args) {
        console.log(args);
    }

        render() {
            return (
                <div>
                    <h1>Display Journal</h1>
                     <button onClick={ this.display}>Add to List</button>
                </div>
            )
        }

        private display = () => {
            var data = ipcRenderer.sendSync('read')
            console.log("private display: " + data)
            this.buildList(data);
        };
    }

