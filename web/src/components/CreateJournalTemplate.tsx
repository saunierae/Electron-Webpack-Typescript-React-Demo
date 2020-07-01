import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";

type CreateJournalState = {nav: boolean, navDest: string}

export class CreateJournalTemplate extends React.Component <{}, CreateJournalState>{
    constructor(props) {
        super(props)
    
        this.state = {
             nav: false,
             navDest: null,
        }
    }

    Item = () => {
        let history = useHistory();
      };

      handleClick = (destination) => {
        console.log("got into handleClick");
        this.setState({nav: true, navDest: destination});
        // history.pushState('/JournalTemplateView');
    }

    render() {
        if (this.state.nav) {  
            this.setState({nav: false});          
            return <Redirect to={this.state.navDest}/>
        }
        return (
            <div>
                <h1>Current Journals</h1>
                <button className="center" onClick={e => this.handleClick('/JournalTemplateView')}>Create Journal Template</button>
                <button className="centerRow2" onClick={e => this.handleClick('/DeleteJournal')}>Delete Journal</button>
                <button className="bottomRow" onClick={() => history.back()}>Back</button>
            </div>
        )
    }
}

export default CreateJournalTemplate


