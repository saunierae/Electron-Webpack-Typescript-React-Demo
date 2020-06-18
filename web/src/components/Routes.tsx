// import * as React from "react";
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { ToDoList } from "./ToDo";

// // import CurrentJournals from "./CurrentJournals/CurrentJournals";
// // import SelectJournalTemplate from "./SelectJournalTemplate/SelectJournalTemplate";

// export class Routes extends React.Component {
//     render () {
//         return (
//           <BrowserRouter>
//             <Route 
//               path='/'
//               render={ props => <ToDoList {...props} />}
//             />
//           </BrowserRouter>
//         )
//       }
//     }
//     class ParentComponent extends React.Component {
//       render () {
//         return <ChildComponent {...this.props} />
//       }
//     }
//     class ChildComponent extends React.Component {
//       redirectToTarget = () => {
//         this.props.history.push(`/target`)
//       }
//       render () {
//         return (
//            <div>
//             {this.renderRedirect()}
//             <button onClick={this.redirectToTarget}>Redirect</button>
//             <button onClick={this.redirectToTarget}>Redirect</button>
//             <button onClick={this.redirectToTarget}>Redirect</button>
//             <button onClick={this.redirectToTarget}>Redirect</button>
//            </div>   
//         )
//       }
//     }