import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";

import ReactTable from 'react-table';
import 'react-table/react-table.css';



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBf9bARdmnzSAH20NnxmOe6wfEJjxfRSaI",
    authDomain: "spaceghost-coast-to-coast.firebaseapp.com",
    databaseURL: "https://spaceghost-coast-to-coast.firebaseio.com",
    projectId: "spaceghost-coast-to-coast",
    storageBucket: "spaceghost-coast-to-coast.appspot.com",
    messagingSenderId: "782988371532"
  };
  firebase.initializeApp(config);



class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      lastBottle: '',
      lastNap: '',
      lastDiaper: ''
    };
  }

  

  componentDidMount() {
    const database = firebase.database().ref('BabyScorecard');
    database.on('value', snapshot => {
      const data = [];

      snapshot.forEach(childSnapshot => {
        const times = {
          lastBottle: childSnapshot.val().lastBottle,
          lastNap: childSnapshot.val().lastNap,
          lastDiaper: childSnapshot.val().lastDiaper
        };
        data.push(times)
      });

      this.setState(prevState => {
        return { data: [...prevState.data, ...data]};
      });
    });
  }

  handleChange = event => {
    if (event.target.name === 'lastBottle')
      this.setState({ lastBottle: event.target.value });
    if (event.target.name === 'lastNap')
      this.setState({ lastNap: event.target.value})
    if (event.target.name === 'lastDiaper')
      this.setState({ lastDiaper: event.target.value})
  };

  handleSubmit = event => {
    this.listPrimitive.push({
      lastBottle: this.state.lastBottle,
      lastNap: this.state.lastNap,
      lastDiaper: this.state.lastDiaper
  });
  this.setState({ lastBottle: "", lastNap: "", lastDiaper: "" });
  event.preventDefault();
  };

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Baby Scorecard</h1>
        </header>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h3>Add new record</h3>
            <label>
              Last Bottle:
              <input
                type="text"
                name="lastBottle"
                value={this.state.lastBottle}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Last Nap:
              <input
                type="text"
                name="lastNap"
                value={this.state.lastNap}
                onChange={this.handleChange}
              />
            </label>{" "} 
            <label>
              Last Diaper:
              <input
                type="text"
                name="lastDiaper"
                value={this.state.lastDiaper}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </p>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Time of Last Bottle",
                accessor: "lastBottle",
                Cell: this.renderEditable
              },
              {
                Header: "Time of Last Nap",
                accessor: "lastNap",
                Cell: this.renderEditable
              },
              {
                Header: 'Time of Last Diaper',
                accessor: 'lastDiaper',
                Cell: this.renderEditable
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }

  
  
}

export default App;


