import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { db } from './Firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'times'), (querySnapshot) => {
      const timesData = [];
      querySnapshot.forEach((doc) => {
        const { bottle, nap, diaper, notes } = doc.data();
        timesData.push({ key: doc.id, bottle, nap, diaper, notes });
      });
      setTimes(timesData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-bottle">Baby Scorecard</h3>
        </div>
        <div className="panel-body">
          <h6><Link to="/create">add new entry</Link></h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Entry</th>
                <th>Bottle</th>
                <th>Awake</th>
                <th>Diaper</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {times.map(board =>
                <tr key={board.key}>
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

export default App;
