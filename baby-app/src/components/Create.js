import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('times');
    this.state = {
      bottle: '',
      nap: '',
      diaper: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { bottle, nap, diaper } = this.state;

    this.ref.add({
      bottle,
      nap,
      diaper
    }).then((docRef) => {
      this.setState({
        bottle: '',
        nap: '',
        diaper: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { bottle, nap, diaper } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-bottle">
              Log events
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Log History</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="bottle">bottle:</label>
                <input type="text" class="form-control" name="bottle" value={bottle} onChange={this.onChange} placeholder="bottle" />
              </div>
              <div class="form-group">
                <label for="nap">nap:</label>
                <textArea class="form-control" name="nap" onChange={this.onChange} placeholder="nap" cols="80" rows="3">{nap}</textArea>
              </div>
              <div class="form-group">
                <label for="diaper">diaper:</label>
                <input type="text" class="form-control" name="diaper" value={diaper} onChange={this.onChange} placeholder="diaper" />
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