import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({});

  useEffect(() => {
    getDoc(doc(db, 'times', id)).then((docSnap) => {
      if (docSnap.exists()) {
        setBoard(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'times', id));
      navigate('/');
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4><Link to="/">Back to Baby Scorecard</Link></h4>
        </div>
        <div className="panel-body">
          <dl>
            <dt>bottle:</dt>
            <dd>{board.bottle}</dd>
            <dt>awake:</dt>
            <dd>{board.nap}</dd>
            <dt>diaper:</dt>
            <dd>{board.diaper}</dd>
            <dt>notes:</dt>
            <dd>{board.notes}</dd>
          </dl>
          <Link to={`/edit/${id}`} className="btn btn-success">Edit</Link>&nbsp;
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Show;
