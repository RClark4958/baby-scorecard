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
      const { nap, bottle, diaper } = doc.data();
      times.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nap,
        bottle,
        diaper,
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
            <h3 class="panel-nap">
              Baby Scorecard
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">log new event</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Time of Last Bottle</th>
                  <th>Time of Last Nap</th>
                  <th>Time of Last Diaper</th>
                </tr>
              </thead>
              <tbody>
                {this.state.times.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.nap}</Link></td>
                    <td>{board.bottle}</td>
                    <td>{board.diaper}</td>
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
