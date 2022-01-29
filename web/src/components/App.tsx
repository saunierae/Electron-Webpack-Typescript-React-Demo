import * as React from "react";
import * as Redux from  "redux"; 

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";

export class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <div className="app component-div">
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
                <img src={reactLogo.default} height="480"/>
                {this.props.children}
            </div>
        );
    }
}



