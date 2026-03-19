import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Create.css';

function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ bottle: '', nap: '', diaper: '', notes: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'times'), form);
      navigate('/');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-bottle">Add New Entry</h3>
        </div>
        <div className="panel-body">
          <h4><Link to="/" className="btn btn-primary">Back to Scorecard</Link></h4>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="bottle">bottle:</label>
              <input type="time" className="form-control" id="bottle" name="bottle" value={form.bottle} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="nap">awake:</label>
              <input type="time" className="form-control" id="nap" name="nap" value={form.nap} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="diaper">diaper:</label>
              <input type="time" className="form-control" id="diaper" name="diaper" value={form.diaper} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="notes">notes:</label>
              <textarea className="form-control" id="notes" name="notes" value={form.notes} onChange={onChange} cols="80" rows="3" />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
