import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Hamoni from 'hamoni-sync';


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

  handleChange = event => {
    if (event.target.name === 'lastBottle')
      this.setState({ lastBottle: event.target.value });
    if (event.target.name === 'lastNap')
      this.setState({ lastNap: event.target.value})
    if (event.target.name === 'lastDiaper')
      this.setState({ lastDiaper: event.target.value})
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
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


