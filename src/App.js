import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('times');
    this.unsubscribe = null;
    this.state = {
      times: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const times = [];
    querySnapshot.forEach((doc) => {
      const { bottle, nap,  diaper, notes } = doc.data();
      times.push({
        key: doc.id,
        doc, // DocumentSnapshot
        bottle,
        nap,
        diaper,
        notes
      });
    });
    this.setState({
      times
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-bottle">
              Baby Scorecard
            </h3>
          </div>
          <div class="panel-body">
            <h6><Link to="/create">add to log</Link></h6>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Entry</th>
                  <th>Last Bottle</th>
                  <th>Last Nap</th>
                  <th>Last Diaper</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.times.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>Edit</Link></td>
                    <td>{board.bottle}</td>
                    <td>{board.nap}</td>
                    <td>{board.diaper}</td>
                    <td>{board.notes}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
