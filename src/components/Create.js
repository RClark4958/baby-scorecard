import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import './Create.css';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('times');
    this.state = {
      bottle: '',
      nap: '',
      diaper: '',
      notes: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { bottle, nap, diaper, notes } = this.state;

    this.ref.add({
      bottle,
      nap,
      diaper,
      notes
    }).then((docRef) => {
      this.setState({
        bottle: '',
        nap: '',
        diaper: '',
        notes: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { bottle, nap, diaper, notes } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-bottle">
              Add New Entry
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Back to Scorecard</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="bottle">bottle:</label>
                <input type="text" class="form-control" name="bottle" value={bottle} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="nap">awake:</label>
                <input type="text" class="form-control" name="nap" value={nap} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="diaper">diaper:</label>
                <input type="text" class="form-control" name="diaper" value={diaper} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="notes">notes:</label>
                <textArea class="form-control" name="notes" onChange={this.onChange} placeholder="" cols="80" rows="3">{notes}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;