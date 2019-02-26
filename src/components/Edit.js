import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      bottle: '',
      nap: '',
      diaper: '',
      notes: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('times').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          bottle: board.bottle,
          nap: board.nap,
          diaper: board.diaper,
          notes: board.notes
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { bottle, nap, diaper, notes } = this.state;

    const updateRef = firebase.firestore().collection('times').doc(this.state.key);
    updateRef.set({
      bottle,
      nap,
      diaper
    }).then((docRef) => {
      this.setState({
        key: '',
        bottle: '',
        nap: '',
        diaper: '',
        notes: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-bottle">
              EDIT LOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Baby Log</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="bottle">bottle:</label>
                <input type="text" class="form-control" name="bottle" value={this.state.bottle} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="nap">nap:</label>
                <input type="text" class="form-control" name="nap" value={this.state.nap} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="diaper">diaper:</label>
                <input type="text" class="form-control" name="diaper" value={this.state.diaper} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="notes">notes:</label>
                <input type="text" class="form-control" name="notes" value={this.state.notes} onChange={this.onChange} placeholder="" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;